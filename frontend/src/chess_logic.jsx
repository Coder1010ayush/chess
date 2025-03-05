// ----------------------------------* utf-8 encoding* -------------------------------
// this file contains all the core logic implementation for movements
// functionality : 
//    01. valid moves of a piece will be colored on clicking on a piece 
//    02. checkmate condition 
//    03. checking when a piece does not have a legal move 
//    04. moving a piece to only the valid position 

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

// Board Class
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
            this.board[end.row][end.col] = piece;
            this.board[start.row][start.col] = null;
            return true;
        }
        return false;
    }
}
export default Board;