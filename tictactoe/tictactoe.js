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

    const askWhereToSet = function () {
        const playerChoice = prompt('Where to set? ');
        return playerChoice.split(', ')
    }

    return {
        checkWin, askWhereToSet
    }
})()


const gameBoard = (function () {
    // Create empty board
    let currentBoard = [[false, false, false], [false, false, false], [false, false, false]];

    // Put player's choice on board
    const setMark = function (mark, horizontal, vertical) {
        currentBoard[vertical][horizontal] = mark;
    }

    // Board getter
    const getBoard = () => currentBoard;

    // Visually print the board
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


function Player () {
    const one = 'X';
    const two = 'O';

    return {
        one, two
    }
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readline.question('Who are you?', name => {
    console.log(`Hey there ${name}!`);
    readline.close();
  });

//let [a, b] = game.askWhereToSet()
//gameBoard.setMark(a, b)


console.log(gameBoard.printBoard())

// TODO Add turn system to find the draw state in the game
// After 9 turns