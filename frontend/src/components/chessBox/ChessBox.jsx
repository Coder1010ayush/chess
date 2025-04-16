import React, { useState } from "react";
import Board from "../../chess_logic";

function ChessBox() {
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
          { }
          <div className="w-[440px] h-[440px] rounded-md overflow-hidden grid grid-cols-8">
              { }
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
                                  <img src={piece} alt="chess piece" className="w-[80%] h-[80%]" />
                              )}
                          </div>
                      );
                  })
              )}
          </div>
      </div>
  )
}

export default ChessBox;