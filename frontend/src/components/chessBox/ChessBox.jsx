// import React, { useState } from "react";
// import Board from "../../chess_logic";

// function ChessBox() {
//   const [board] = useState(new Board());
//   const [selectedSquare, setSelectedSquare] = useState(null);

//   const handleClick = (row, col) => {
//     if (selectedSquare) {
//       const success = board.movePiece(selectedSquare, { row, col });
//       if (success) {
//         setSelectedSquare(null);
//       } else {
//         alert("Invalid move");
//       }
//     } else {
//       setSelectedSquare({ row, col });
//     }
//   };

//   const getPieceImage = (row, col) => {
//     const piece = board.getPiece(row, col);
//     if (!piece) return null;
//     const { type, color } = piece;
//     return `/pieces/${type}_${color}.png`;
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-[#312e2b] p-4">
//       <div className="w-[440px] h-[440px] rounded-md overflow-hidden grid grid-cols-8">
//         {[...Array(8)].map((_, row) =>
//           [...Array(8)].map((_, col) => {
//             const isBlack = (row + col) % 2 === 1;
//             const piece = getPieceImage(row, col);

//             return (
//               <div
//                 key={`${row}-${col}`}
//                 className={`w-full aspect-square flex items-center justify-center cursor-pointer ${
//                   isBlack ? "bg-[#739552]" : "bg-[#EBECD0]"
//                 }`}
//                 onClick={() => handleClick(row, col)}
//               >
//                 {piece && (
//                   <img
//                     src={piece}
//                     alt="chess piece"
//                     className="w-[80%] h-[80%]"
//                   />
//                 )}
//               </div>
//             );
//           })
//         )}
//       </div>

//       <div className="flex bg-black flex-col space-y-4 ml-6 w-[220px] h-[440px] p-4">
//         <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md shadow w-full relative">
//           <span className="block text-center w-full">Set Time</span>
//           <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-sm">
//             ▼
//           </span>
//         </button>
//         <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow">
//           Start Game
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChessBox;

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  createInitialBoard,
  generateLegalMoves,
  highlightsForSquare,
  makeMove,
  COLORS,
  getGameStatus,
  inCheck,
  createClock,
  startClock,
  stopClock,
  switchTurnClock,
  fen,
} from "./chess_func";

function msToMMSS(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function ChessBox() {
  // Core game state
  const [board, setBoard] = useState(createInitialBoard());
  const [turn, setTurn] = useState(COLORS.WHITE);
  const [selected, setSelected] = useState(null);
  const [highlights, setHighlights] = useState([]);
  const [status, setStatus] = useState({ type: "ongoing" });
  const [history, setHistory] = useState([]); // simple SAN log (optional)

  // Clock
  const [initialMs, setInitialMs] = useState(5 * 60_000); // 5+0 default
  const [incrementMs, setIncrementMs] = useState(0);
  const [clock, setClock] = useState(() =>
    createClock({ initialMs, incrementMs })
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [, setTick] = useState(0); // force re-render for running clock
  const intervalRef = useRef(null);

  // Start/stop ticker for UI updates while clock is running
  useEffect(() => {
    if (clock.running && !intervalRef.current) {
      intervalRef.current = setInterval(() => setTick((t) => t + 1), 200);
    } else if (!clock.running && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [clock.running]);

  const isGameOver = status.type === "checkmate" || status.type === "stalemate";
  const sideToMove = turn === COLORS.WHITE ? "White" : "Black";

  const isSquareHighlighted = (r, c) =>
    highlights.some((h) => h.row === r && h.col === c);

  const getPieceImage = (r, c) => {
    const piece = board[r][c];
    if (!piece) return null;
    // expects files like /pieces/rook_w.png, /pieces/queen_b.png, etc.
    let cl = "";
    if (piece.color == "b") {
      cl = "black";
    } else {
      cl = "white";
    }
    return `/pieces/${piece.type}_${cl}.png`;
  };

  const ownPieceAt = (r, c) => {
    const p = board[r][c];
    return p && p.color === turn;
  };

  const handleSquareClick = (row, col) => {
    if (isGameOver) return;

    // If a move target is selected, try to move
    if (selected) {
      const result = makeMove(
        board,
        turn,
        selected,
        { row, col },
        { promotion: "queen" }
      );
      if (result.ok) {
        // Switch clock turn
        setClock((prev) => {
          const copy = { ...prev };
          switchTurnClock(copy);
          return { ...copy };
        });

        setBoard(result.board);
        setTurn(result.turn);
        setStatus(result.status);
        setSelected(null);
        setHighlights([]);
        setHistory((h) => [
          ...h,
          // basic algebraic-ish (lightweight); you can swap in toSAN if you like
          `${sideToMove[0]}: ${String.fromCharCode(97 + selected.col)}${
            8 - selected.row
          } → ${String.fromCharCode(97 + col)}${8 - row}`,
        ]);
        return;
      }
      // If clicked an own piece instead, reselect
      if (ownPieceAt(row, col)) {
        setSelected({ row, col });
        setHighlights(highlightsForSquare(board, turn, { row, col }));
        return;
      }
      // Otherwise clear selection
      setSelected(null);
      setHighlights([]);
      return;
    }

    // No selection yet — only allow selecting your own piece
    if (ownPieceAt(row, col)) {
      setSelected({ row, col });
      setHighlights(highlightsForSquare(board, turn, { row, col }));
    }
  };

  const handleStart = () => {
    if (isGameOver) return;
    setClock((prev) => {
      const fresh = createClock({ initialMs, incrementMs });
      startClock(fresh, turn);
      return { ...fresh };
    });
  };

  const handlePause = () => {
    setClock((prev) => {
      const copy = { ...prev };
      stopClock(copy);
      return { ...copy };
    });
  };

  const handleReset = () => {
    setBoard(createInitialBoard());
    setTurn(COLORS.WHITE);
    setSelected(null);
    setHighlights([]);
    setStatus({ type: "ongoing" });
    setHistory([]);
    setClock(createClock({ initialMs, incrementMs }));
  };

  const whiteInCheck = useMemo(() => inCheck(board, COLORS.WHITE), [board]);
  const blackInCheck = useMemo(() => inCheck(board, COLORS.BLACK), [board]);

  // Precompute legal moves for pointer cursor improvements (optional)
  const legalFromSelected = useMemo(() => {
    if (!selected) return [];
    return generateLegalMoves(board, turn, selected);
  }, [board, selected, turn]);

  return (
    <div className="flex items-center justify-center h-screen bg-[#312e2b] p-4 text-white">
      {/* Board */}
      <div className="relative">
        {/* Turn / status banner */}
        <div className="absolute -top-10 left-0 right-0 text-center">
          {status.type === "checkmate" ? (
            <span className="px-3 py-1 rounded bg-red-600/90 text-sm">
              Checkmate — {turn === COLORS.WHITE ? "Black" : "White"} wins
            </span>
          ) : status.type === "stalemate" ? (
            <span className="px-3 py-1 rounded bg-yellow-600/90 text-sm">
              Stalemate — Draw
            </span>
          ) : status.type === "check" ? (
            <span className="px-3 py-1 rounded bg-orange-600/90 text-sm">
              Check — {sideToMove} to move
            </span>
          ) : (
            <span className="px-3 py-1 rounded bg-gray-700/80 text-sm">
              {sideToMove} to move{" "}
              {turn === COLORS.WHITE
                ? whiteInCheck
                  ? "(in check)"
                  : ""
                : blackInCheck
                ? "(in check)"
                : ""}
            </span>
          )}
        </div>

        <div className="w-[440px] h-[440px] rounded-md overflow-hidden grid grid-cols-8 select-none">
          {[...Array(8)].map((_, row) =>
            [...Array(8)].map((__, col) => {
              const isDark = (row + col) % 2 === 1;
              const piece = getPieceImage(row, col);
              const isSel =
                selected && selected.row === row && selected.col === col;
              const isHL = isSquareHighlighted(row, col);
              const isCapture = isHL && board[row][col];

              const canClick = isHL || ownPieceAt(row, col);
              return (
                <div
                  key={`${row}-${col}`}
                  onClick={() => handleSquareClick(row, col)}
                  className={[
                    "relative w-full aspect-square flex items-center justify-center",
                    canClick ? "cursor-pointer" : "cursor-default",
                    isDark ? "bg-[#739552]" : "bg-[#EBECD0]",
                    isSel ? "outline outline-2 outline-yellow-400" : "",
                  ].join(" ")}
                >
                  {/* Highlight dot / ring */}
                  {isHL && !piece && (
                    <span className="absolute w-4 h-4 rounded-full bg-black/30" />
                  )}
                  {isCapture && (
                    <span className="absolute inset-0 border-4 border-black/30 rounded-full" />
                  )}

                  {piece && (
                    <img
                      src={piece}
                      alt="chess piece"
                      className="w-[80%] h-[80%] pointer-events-none"
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex bg-[#1f1f1f] flex-col space-y-3 ml-6 w-[260px] h-[440px] p-4 rounded-md">
        {/* Set Time */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen((v) => !v)}
            className="bg-gray-700 hover:bg-gray-800 w-full text-left px-4 py-2 rounded-md shadow relative"
          >
            <span className="block w-full">Set Time</span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm">
              ▼
            </span>
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 mt-2 w-full bg-[#2a2a2a] rounded-md border border-gray-700 overflow-hidden">
              {[
                { label: "1 + 0 (Bullet)", i: 60_000, inc: 0 },
                { label: "3 + 2 (Blitz)", i: 180_000, inc: 2000 },
                { label: "5 + 0 (Blitz)", i: 300_000, inc: 0 },
                { label: "10 + 5 (Rapid)", i: 600_000, inc: 5000 },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => {
                    setInitialMs(opt.i);
                    setIncrementMs(opt.inc);
                    setClock(
                      createClock({ initialMs: opt.i, incrementMs: opt.inc })
                    );
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Clock display */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className={`p-3 rounded-md ${
              turn === COLORS.WHITE ? "bg-gray-700" : "bg-gray-800"
            }`}
          >
            <div className="text-xs text-gray-300 mb-1">White</div>
            <div className="text-xl tabular-nums">
              {msToMMSS(clock.whiteMs)}
            </div>
          </div>
          <div
            className={`p-3 rounded-md ${
              turn === COLORS.BLACK ? "bg-gray-700" : "bg-gray-800"
            }`}
          >
            <div className="text-xs text-gray-300 mb-1">Black</div>
            <div className="text-xl tabular-nums">
              {msToMMSS(clock.blackMs)}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <button
            onClick={handleStart}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow"
          >
            Start
          </button>
          <button
            onClick={handlePause}
            className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md shadow"
          >
            Pause
          </button>
        </div>
        <button
          onClick={handleReset}
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md shadow"
        >
          Reset Game
        </button>

        {/* FEN + small log */}
        <div className="mt-2 p-2 bg-[#151515] rounded text-xs text-gray-300 h-full overflow-auto">
          <div className="mb-1 text-gray-400">FEN</div>
          <div className="mb-2 break-all">{fen(board, turn)}</div>
          <div className="mb-1 text-gray-400">Moves</div>
          <ol className="list-decimal list-inside space-y-1">
            {history.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
