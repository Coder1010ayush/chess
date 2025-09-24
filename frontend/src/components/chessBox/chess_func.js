/*
  chess_func.js
  Lightweight chess helpers for a two‑player browser game.
  Works with either a plain 8x8 matrix board or an adapter around your Board class.

  Coordinate system: { row: 0..7, col: 0..7 }, row 0 at White's back rank.

  Exported API (ESM):
   - createInitialBoard()
   - cloneBoard(board)
   - pieceAt(board, sq)
   - isInside(sq)
   - forEachSquare(fn)
   - generateLegalMoves(board, turn, fromSq, options)
   - isLegalMove(board, turn, fromSq, toSq)
   - makeMove(board, turn, fromSq, toSq, opts)
   - inCheck(board, color)
   - isCheckmate(board, color)
   - isStalemate(board, color)
   - getGameStatus(board, turn)
   - fen(board, turn, castling, enPassant, halfmove, fullmove)
   - parseFEN(fenStr)
   - toSAN(boardBefore, boardAfter, move, checkInfo)
   - moveHistoryPush(history, san, meta)
   - createClock({initialMs, incrementMs})
   - startClock(clock, turn)
   - stopClock(clock)
   - switchTurnClock(clock)

  Pieces are objects: { type: 'king|queen|rook|bishop|knight|pawn', color: 'w|b', moved?: boolean }
*/

// ---------- Utilities ----------
export const COLORS = { WHITE: 'w', BLACK: 'b' };
export const TYPES = { K: 'king', Q: 'queen', R: 'rook', B: 'bishop', N: 'knight', P: 'pawn' };

export function createInitialBoard() {
  const back = (color) => [
    { type: TYPES.R, color },
    { type: TYPES.N, color },
    { type: TYPES.B, color },
    { type: TYPES.Q, color },
    { type: TYPES.K, color },
    { type: TYPES.B, color },
    { type: TYPES.N, color },
    { type: TYPES.R, color },
  ];
  const pawns = (color) => Array.from({ length: 8 }, () => ({ type: TYPES.P, color }));
  const empty = () => Array.from({ length: 8 }, () => null);
  return [
    back(COLORS.BLACK),
    pawns(COLORS.BLACK),
    empty(), empty(), empty(), empty(),
    pawns(COLORS.WHITE),
    back(COLORS.WHITE),
  ];
}

export function cloneBoard(board) {
  return board.map(row => row.map(cell => (cell ? { ...cell } : null)));
}

export function isInside({ row, col }) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

export function pieceAt(board, { row, col }) {
  return isInside({ row, col }) ? board[row][col] : null;
}

export function forEachSquare(fn) {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) fn({ row: r, col: c });
  }
}

// ---------- Move generation ----------
const DIRS = {
  KNIGHT: [
    { dr: 2, dc: 1 }, { dr: 2, dc: -1 }, { dr: -2, dc: 1 }, { dr: -2, dc: -1 },
    { dr: 1, dc: 2 }, { dr: 1, dc: -2 }, { dr: -1, dc: 2 }, { dr: -1, dc: -2 },
  ],
  KING: [
    { dr: 1, dc: 0 }, { dr: -1, dc: 0 }, { dr: 0, dc: 1 }, { dr: 0, dc: -1 },
    { dr: 1, dc: 1 }, { dr: 1, dc: -1 }, { dr: -1, dc: 1 }, { dr: -1, dc: -1 },
  ],
  ROOK: [ { dr: 1, dc: 0 }, { dr: -1, dc: 0 }, { dr: 0, dc: 1 }, { dr: 0, dc: -1 } ],
  BISHOP: [ { dr: 1, dc: 1 }, { dr: 1, dc: -1 }, { dr: -1, dc: 1 }, { dr: -1, dc: -1 } ],
};

function pushMoveIfSafe(moves, board, turn, from, to) {
  // Tentatively make move and verify king safety
  const test = cloneBoard(board);
  const moving = pieceAt(test, from);
  const captured = pieceAt(test, to);
  test[to.row][to.col] = { ...moving, moved: true };
  test[from.row][from.col] = null;
  if (!inCheck(test, turn)) moves.push({ from, to, captured: !!captured });
}

export function generateLegalMoves(board, turn, fromSq, options = {}) {
  const moves = [];
  const add = (to) => pushMoveIfSafe(moves, board, turn, fromSq, to);
  const piece = pieceAt(board, fromSq);
  if (!piece || piece.color !== turn) return moves;

  const forward = piece.color === COLORS.WHITE ? -1 : 1; // White moves up (towards row 0)

  switch (piece.type) {
    case TYPES.P: {
      const one = { row: fromSq.row + forward, col: fromSq.col };
      if (isInside(one) && !pieceAt(board, one)) add(one);
      const startRow = piece.color === COLORS.WHITE ? 6 : 1;
      const two = { row: fromSq.row + 2 * forward, col: fromSq.col };
      if (fromSq.row === startRow && !pieceAt(board, one) && !pieceAt(board, two)) add(two);
      // captures
      for (const dc of [-1, 1]) {
        const cap = { row: fromSq.row + forward, col: fromSq.col + dc };
        if (!isInside(cap)) continue;
        const tgt = pieceAt(board, cap);
        if (tgt && tgt.color !== piece.color) add(cap);
      }
      // TODO: en passant (options.enPassant)
      break;
    }
    case TYPES.N: {
      for (const { dr, dc } of DIRS.KNIGHT) {
        const to = { row: fromSq.row + dr, col: fromSq.col + dc };
        if (!isInside(to)) continue;
        const tgt = pieceAt(board, to);
        if (!tgt || tgt.color !== piece.color) add(to);
      }
      break;
    }
    case TYPES.B: {
      rayMoves(board, fromSq, piece.color, DIRS.BISHOP, add);
      break;
    }
    case TYPES.R: {
      rayMoves(board, fromSq, piece.color, DIRS.ROOK, add);
      break;
    }
    case TYPES.Q: {
      rayMoves(board, fromSq, piece.color, [...DIRS.ROOK, ...DIRS.BISHOP], add);
      break;
    }
    case TYPES.K: {
      for (const { dr, dc } of DIRS.KING) {
        const to = { row: fromSq.row + dr, col: fromSq.col + dc };
        if (!isInside(to)) continue;
        const tgt = pieceAt(board, to);
        if (!tgt || tgt.color !== piece.color) add(to);
      }
      // TODO: castling (options.castling)
      break;
    }
  }
  // Promotion hinting: mark moves that land on back rank
  for (const m of moves) {
    const p = pieceAt(board, fromSq);
    if (p && p.type === TYPES.P && (m.to.row === 0 || m.to.row === 7)) m.promotion = true;
  }
  return moves;
}

function rayMoves(board, fromSq, color, dirs, add) {
  for (const { dr, dc } of dirs) {
    let r = fromSq.row + dr, c = fromSq.col + dc;
    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
      const to = { row: r, col: c };
      const tgt = pieceAt(board, to);
      if (!tgt) {
        add(to);
      } else {
        if (tgt.color !== color) add(to);
        break;
      }
      r += dr; c += dc;
    }
  }
}

export function isLegalMove(board, turn, fromSq, toSq) {
  return generateLegalMoves(board, turn, fromSq).some(m => m.to.row === toSq.row && m.to.col === toSq.col);
}

// ---------- King safety & status ----------
export function inCheck(board, color) {
  const king = findKing(board, color);
  if (!king) return false;
  return squareAttackedBy(board, king, color === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE);
}

export function isCheckmate(board, color) {
  if (!inCheck(board, color)) return false;
  // Any legal move to escape?
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const from = { row: r, col: c };
      const p = pieceAt(board, from);
      if (!p || p.color !== color) continue;
      const moves = generateLegalMoves(board, color, from);
      if (moves.length) return false;
    }
  }
  return true;
}

export function isStalemate(board, color) {
  if (inCheck(board, color)) return false;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const from = { row: r, col: c };
      const p = pieceAt(board, from);
      if (!p || p.color !== color) continue;
      if (generateLegalMoves(board, color, from).length) return false;
    }
  }
  return true;
}

export function getGameStatus(board, turn) {
  if (isCheckmate(board, turn)) return { type: 'checkmate', winner: turn === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE };
  if (isStalemate(board, turn)) return { type: 'stalemate' };
  if (inCheck(board, turn)) return { type: 'check' };
  return { type: 'ongoing' };
}

function findKing(board, color) {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && p.type === TYPES.K && p.color === color) return { row: r, col: c };
    }
  }
  return null;
}

function squareAttackedBy(board, sq, attackerColor) {
  // Check all opponent moves that could capture sq
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const from = { row: r, col: c };
      const p = pieceAt(board, from);
      if (!p || p.color !== attackerColor) continue;
      const attacks = pseudoMoves(board, from, true /* asAttacks */);
      if (attacks.some(m => m.row === sq.row && m.col === sq.col)) return true;
    }
  }
  return false;
}

function pseudoMoves(board, fromSq, asAttacks = false) {
  // Like move generation, but:
  //  - ignores own‑king safety
  //  - for pawns: asAttacks=true returns diagonal capture targets only
  const res = [];
  const p = pieceAt(board, fromSq);
  if (!p) return res;
  const color = p.color;
  const forward = color === COLORS.WHITE ? -1 : 1;
  const push = (r, c) => { if (isInside({ row: r, col: c })) res.push({ row: r, col: c }); };
  switch (p.type) {
    case TYPES.P: {
      if (asAttacks) {
        push(fromSq.row + forward, fromSq.col - 1);
        push(fromSq.row + forward, fromSq.col + 1);
      } else {
        // forward non‑capture
        const one = { row: fromSq.row + forward, col: fromSq.col };
        if (isInside(one) && !pieceAt(board, one)) res.push(one);
        const startRow = color === COLORS.WHITE ? 6 : 1;
        const two = { row: fromSq.row + 2 * forward, col: fromSq.col };
        if (fromSq.row === startRow && !pieceAt(board, one) && !pieceAt(board, two)) res.push(two);
        // captures
        for (const dc of [-1, 1]) {
          const cap = { row: fromSq.row + forward, col: fromSq.col + dc };
          const tgt = pieceAt(board, cap);
          if (tgt && tgt.color !== color) res.push(cap);
        }
      }
      break;
    }
    case TYPES.N: {
      for (const { dr, dc } of DIRS.KNIGHT) push(fromSq.row + dr, fromSq.col + dc);
      break;
    }
    case TYPES.B: rayPseudo(board, fromSq, DIRS.BISHOP, res); break;
    case TYPES.R: rayPseudo(board, fromSq, DIRS.ROOK, res); break;
    case TYPES.Q: rayPseudo(board, fromSq, [...DIRS.ROOK, ...DIRS.BISHOP], res); break;
    case TYPES.K: for (const { dr, dc } of DIRS.KING) push(fromSq.row + dr, fromSq.col + dc); break;
  }
  return res.filter(sq => isInside(sq));
}

function rayPseudo(board, fromSq, dirs, out) {
  const color = pieceAt(board, fromSq)?.color;
  for (const { dr, dc } of dirs) {
    let r = fromSq.row + dr, c = fromSq.col + dc;
    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
      const tgt = pieceAt(board, { row: r, col: c });
      out.push({ row: r, col: c });
      if (tgt) break; // stop at first piece (can capture but no beyond)
      r += dr; c += dc;
    }
  }
}

// ---------- Make move ----------
export function makeMove(board, turn, fromSq, toSq, opts = {}) {
  if (!isLegalMove(board, turn, fromSq, toSq)) return { ok: false, reason: 'illegal' };
  const next = cloneBoard(board);
  const moving = pieceAt(next, fromSq);
  // Promotion
  let placed = { ...moving, moved: true };
  if (moving.type === TYPES.P && (toSq.row === 0 || toSq.row === 7)) {
    const promoteTo = opts.promotion || TYPES.Q; // default promote to queen
    placed = { type: promoteTo, color: moving.color, moved: true };
  }
  // TODO: en passant, castling rook move
  next[toSq.row][toSq.col] = placed;
  next[fromSq.row][fromSq.col] = null;
  const nextTurn = turn === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
  const status = getGameStatus(next, nextTurn);
  return { ok: true, board: next, turn: nextTurn, status };
}

// ---------- Notation & history (minimal) ----------
export function toSAN(boardBefore, boardAfter, move, checkInfo) {
  const p = pieceAt(boardBefore, move.from);
  const pieceLetter = { king: 'K', queen: 'Q', rook: 'R', bishop: 'B', knight: 'N', pawn: '' }[p.type];
  const capture = pieceAt(boardBefore, move.to) ? 'x' : '';
  const file = String.fromCharCode('a'.charCodeAt(0) + move.to.col);
  const rank = (8 - move.to.row).toString();
  const promo = move.promotion && p.type === TYPES.P ? `=${promoLetter(move.promotionType||'queen')}` : '';
  const suffix = checkInfo?.type === 'checkmate' ? '#' : checkInfo?.type === 'check' ? '+' : '';
  return `${pieceLetter}${capture && p.type === TYPES.P ? file : ''}${capture}${file}${rank}${promo}${suffix}`;
}

function promoLetter(type) {
  return { queen: 'Q', rook: 'R', bishop: 'B', knight: 'N' }[type] || 'Q';
}

export function moveHistoryPush(history, san, meta = {}) {
  const last = history[history.length - 1];
  if (!last || last.moves.length === 2) history.push({ ply: history.length + 1, moves: [san], meta: [meta] });
  else last.moves.push(san), last.meta.push(meta);
}

// ---------- Simple chess clock ----------
export function createClock({ initialMs = 5 * 60_000, incrementMs = 0 } = {}) {
  return {
    whiteMs: initialMs,
    blackMs: initialMs,
    inc: incrementMs,
    running: false,
    turn: COLORS.WHITE,
    lastTs: null,
  };
}

export function startClock(clock, turn = clock.turn) {
  if (clock.running) return clock;
  clock.running = true;
  clock.turn = turn;
  clock.lastTs = performance.now();
  return clock;
}

export function stopClock(clock) {
  if (!clock.running) return clock;
  const now = performance.now();
  const delta = Math.max(0, Math.floor(now - (clock.lastTs || now)));
  if (clock.turn === COLORS.WHITE) clock.whiteMs -= delta; else clock.blackMs -= delta;
  clock.running = false;
  clock.lastTs = null;
  return clock;
}

export function switchTurnClock(clock) {
  // Apply increment to side that just moved, then switch
  if (!clock.running) return clock;
  const now = performance.now();
  const delta = Math.max(0, Math.floor(now - (clock.lastTs || now)));
  if (clock.turn === COLORS.WHITE) {
    clock.whiteMs -= delta;
    clock.whiteMs += clock.inc;
    clock.turn = COLORS.BLACK;
  } else {
    clock.blackMs -= delta;
    clock.blackMs += clock.inc;
    clock.turn = COLORS.WHITE;
  }
  clock.lastTs = now;
  return clock;
}

// ---------- FEN (minimal — ignores castling/en passant for now) ----------
export function fen(board, turn = COLORS.WHITE, castling = '-', enPassant = '-', halfmove = 0, fullmove = 1) {
  const rows = [];
  for (let r = 0; r < 8; r++) {
    let s = '', empty = 0;
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (!p) empty++;
      else {
        if (empty) { s += empty; empty = 0; }
        s += pieceToFEN(p);
      }
    }
    if (empty) s += empty;
    rows.push(s);
  }
  return `${rows.join('/')}` + ` ${turn} ${castling} ${enPassant} ${halfmove} ${fullmove}`;
}

function pieceToFEN(p) {
  const map = { king: 'k', queen: 'q', rook: 'r', bishop: 'b', knight: 'n', pawn: 'p' };
  const ch = map[p.type] || 'x';
  return p.color === COLORS.WHITE ? ch.toUpperCase() : ch;
}

export function parseFEN(fenStr) {
  const [placement, turn = 'w'] = fenStr.trim().split(/\s+/);
  const rows = placement.split('/');
  const board = Array.from({ length: 8 }, () => Array(8).fill(null));
  for (let r = 0; r < 8; r++) {
    let c = 0;
    for (const ch of rows[r]) {
      if (/[1-8]/.test(ch)) c += Number(ch);
      else {
        const { type, color } = fenCharToPiece(ch);
        board[r][c++] = { type, color };
      }
    }
  }
  return { board, turn };
}

function fenCharToPiece(ch) {
  const color = ch === ch.toUpperCase() ? COLORS.WHITE : COLORS.BLACK;
  const t = ch.toLowerCase();
  const type = { k: TYPES.K, q: TYPES.Q, r: TYPES.R, b: TYPES.B, n: TYPES.N, p: TYPES.P }[t];
  return { type, color };
}

// ---------- Highlight helpers ----------
export function highlightsForSquare(board, turn, fromSq) {
  const legal = generateLegalMoves(board, turn, fromSq);
  return legal.map(m => m.to);
}

export function threatenedSquares(board, color) {
  const out = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const from = { row: r, col: c };
      const p = pieceAt(board, from);
      if (!p || p.color !== color) continue;
      for (const sq of pseudoMoves(board, from, true)) if (isInside(sq)) out.push(sq);
    }
  }
  return out;
}

// ---------- Adapter helpers for your existing Board class ----------
// If you want to keep using your existing Board instance, provide these mapping helpers.
export function boardFromBoardClass(BoardInstance) {
  // Expecting BoardInstance.getPiece(row, col) that returns { type, color }
  const mat = Array.from({ length: 8 }, () => Array(8).fill(null));
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = BoardInstance.getPiece(r, c);
      if (!p) continue;
      // Normalize types if they differ
      const typeMap = {
        king: TYPES.K, queen: TYPES.Q, rook: TYPES.R, bishop: TYPES.B, knight: TYPES.N, pawn: TYPES.P,
        K: TYPES.K, Q: TYPES.Q, R: TYPES.R, B: TYPES.B, N: TYPES.N, P: TYPES.P,
      };
      const colorMap = { white: COLORS.WHITE, black: COLORS.BLACK, w: COLORS.WHITE, b: COLORS.BLACK };
      mat[r][c] = { type: typeMap[p.type] || p.type, color: colorMap[p.color] || p.color };
    }
  }
  return mat;
}

export function applyMoveToBoardClass(BoardInstance, fromSq, toSq) {
  // Returns true/false depending on underlying rules; if true, piece moved.
  return BoardInstance.movePiece(fromSq, toSq);
}