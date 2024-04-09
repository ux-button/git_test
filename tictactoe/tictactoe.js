const game = (function () {
    // Check win situation
    const checkWin = function (board, player) {
        if ((board[0][0] === player) && (board[0][1] === player) && (board[0][2] === player)) {
            return true;
        }
        else if ((board[1][0] === player) && (board[1][1] === player) && (board[1][2] === player)) {
            return true;
        }
        else if ((board[2][0] === player) && (board[2][1] === player) && (board[2][2] === player)) {
            return true;
        }
        else if ((board[0][0] === player) && (board[1][0] === player) && (board[2][0] === player)) {
            return true;
        }
        else if ((board[0][1] === player) && (board[1][1] === player) && (board[2][1] === player)) {
            return true;
        }
        else if ((board[0][2] === player) && (board[1][2] === player) && (board[2][2] === player)) {
            return true;
        }
        else if ((board[0][0] === player) && (board[1][1] === player) && (board[2][2] === player)) {
            return true;
        }
        else if ((board[0][2] === player) && (board[1][1] === player) && (board[2][0] === player)) {
            return true;
        }
        else {
            return false;
        }
    }

    const checkGameOver = function (board) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!board[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    return {
        checkWin, checkGameOver
    }
})()


const gameBoard = (function () {
    // Create empty board
    let currentBoard = [[false, false, false], [false, false, false], [false, false, false]];

    // Put player's choice on board
    const setMark = function (mark, horizontal, vertical) {
        if (currentBoard[vertical][horizontal]) {
            return `This place has already taken`
        }
        else {
            return currentBoard[vertical][horizontal] = mark;
        }
    }

    // Board getter
    const getBoard = () => currentBoard;

    // Visually print the board to console
    const printBoard = function () {
        let board = ""
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (currentBoard[i][j] === false) {
                    board += '·';
                }
                else {
                    board += currentBoard[i][j];
                }
            }
            board += '\n';
        }
        board += '\n';
        return board;
    }

    return {
        setMark, getBoard, printBoard
    }
})()


const player = (function () {
    const one = 'X';
    const two = 'O';

    return {
        one, two
    }
})()