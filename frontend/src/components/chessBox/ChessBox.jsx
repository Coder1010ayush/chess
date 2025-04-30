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
            {/* Chess Board */}
            <div className="w-[440px] h-[440px] rounded-md overflow-hidden grid grid-cols-8">
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

            {/* Right Side Buttons */}
            <div className="flex bg-black flex-col space-y-4 ml-6 w-[220px] h-[440px] p-4">
                <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md shadow w-full relative">
                    <span className="block text-center w-full">Set Time</span>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-sm">▼</span>
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow">
                    Start Game
                </button>
            </div>
        </div>
    );
}

export default ChessBox;
