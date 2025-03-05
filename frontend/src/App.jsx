import React, { useState } from "react";

class Piece {
  constructor(type, color) {
    this.type = type;
    this.color = color;
  }

  canMove(start, end) {
    if (this.type === "pawn") {
      return true;
    }
    if (this.type === "rook") {
      return start.row === end.row || start.col === end.col;
    }
    return false;
  }
}

class Board {
  constructor() {
    this.board = this.initializeBoard();
  }

  initializeBoard() {
    const board = Array(8).fill().map(() => Array(8).fill(null));

    for (let col = 0; col < 8; col++) {
      board[1][col] = new Piece("pawn", "black");
      board[6][col] = new Piece("pawn", "white");
    }

    // pieces names
    const pieces = [
      "rook", "knight", "bishop", "queen",
      "king", "bishop", "knight", "rook"
    ];

    for (let col = 0; col < 8; col++) {
      board[0][col] = new Piece(pieces[col], "black");
      board[7][col] = new Piece(pieces[col], "white");
    }

    return board;
  }

  getPiece(row, col) {
    return this.board[row][col];
  }

  movePiece(start, end) {
    const piece = this.getPiece(start.row, start.col);
    if (piece && piece.canMove(start, end)) {
      // Perform move (simplified)
      this.board[end.row][end.col] = piece;
      this.board[start.row][start.col] = null;
      return true;
    }
    return false;
  }
}

function App() {
  const [board] = useState(new Board());
  const [selectedSquare, setSelectedSquare] = useState(null);

  const handleClick = (row, col) => {
    if (selectedSquare) {
      const success = board.movePiece(selectedSquare, { row, col });
      if (success) {
        setSelectedSquare(null);
      } else {
        alert("Invalid move");
      }
    } else {
      setSelectedSquare({ row, col });
    }
  };

  const getPieceImage = (row, col) => {
    const piece = board.getPiece(row, col);
    if (!piece) return null;
    const { type, color } = piece;
    return `/pieces/${type}_${color}.png`;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#312e2b] p-4">
      {/* Smaller Chessboard Container */}
      <div className="w-[490px] h-[490px] rounded-md overflow-hidden grid grid-cols-8">
        {/* Creating 64 squares dynamically */}
        {[...Array(8)].map((_, row) =>
          [...Array(8)].map((_, col) => {
            const isBlack = (row + col) % 2 === 1;
            const piece = getPieceImage(row, col);

            return (
              <div
                key={`${row}-${col}`}
                className={`w-full aspect-square flex items-center justify-center cursor-pointer ${isBlack ? "bg-[#739552]" : "bg-[#EBECD0]"
                  }`}
                onClick={() => handleClick(row, col)}
              >
                {piece && (
                  <img src={piece} alt="chess piece" className="w-[75%] h-[75%]" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
