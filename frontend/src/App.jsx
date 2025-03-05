import React from "react";

function App() {
  // Function to handle click on a square
  const handleClick = (row, col) => {
    alert(`You clicked on box at row ${row}, column ${col}`);
  };

  // Function to get piece image based on row and column
  const getPieceImage = (row, col) => {
    if (row === 1) return "/pieces/pawn_black.png";  // Black Pawns
    if (row === 6) return "/pieces/pawn_white.png";  // White Pawns

    if (row === 0 || row === 7) {
      const pieces = [
        "rook", "knight", "bishop", "queen",
        "king", "bishop", "knight", "rook"
      ];
      const color = row === 0 ? "black" : "white";
      return `/pieces/${pieces[col]}_${color}.png`;
    }

    return null;
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
