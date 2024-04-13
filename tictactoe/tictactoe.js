const game = (() => {
    let turn = 0;

    // Turn getter setter
    const getTurn = () => turn;
    const nextTurn = () => {
        if (checkGameOver(gameBoard.getBoard(), player.playerTurn())) {
            alert(`Player ${player.playerTurn()} wins!`);
        }
        turn++;
    }

    // Check win situation
    const checkGameOver = (board, player) => {
        if (board[0] === player && board[3] === player && board[6] === player) {
            return true;
        }
        else if (board[1] === player && board[4] === player && board[7] === player) {
            return true;
        }
        else if (board[2] === player && board[5] === player && board[8] === player) {
            return true;
        }
        else if (board[0] === player && board[1] === player && board[2] === player) {
            return true;
        }
        else if (board[3] === player && board[4] === player && board[5] === player) {
            return true;
        }
        else if (board[6] === player && board[7] === player && board[8] === player) {
            return true;
        }
        else if (board[0] === player && board[4] === player && board[8] === player) {
            return true;
        }
        else if (board[2] === player && board[4] === player && board[6] === player) {
            return true;
        }
    }

    return { getTurn, nextTurn, checkGameOver }
})()


// Game board
const gameBoard = (() => {
    // Create empty board
    let currentBoard = [false, false, false, false, false, false, false, false, false];

    const getBoard = () => currentBoard;
    const setBoard = (item) => {
        currentBoard[item] = player.playerTurn();
    }

    return { getBoard, setBoard }
})()


// Player info
const player = (() => {
    const players = ['X', 'O'];

    const playerTurn = () => {
        if ((game.getTurn() % 2) === 0) {
            return player.players[0];
        }
        else {
            return player.players[1];
        }
    }

    return { players, playerTurn }
})()

// Display for game
const gameDisplay = (() => {
    const gameContainer = document.querySelector('#game-container');

    const startGame = (() => {
        document.addEventListener('DOMContentLoaded', () => {
            for (let i = 0; i < gameBoard.getBoard().length; i++) {
                const boardGridItem = document.createElement('div')
                boardGridItem.setAttribute('id', `gameitem-${i}`)
                boardGridItem.classList.add('game-grid-item');
                if (!i) {
                    boardGridItem.innerHTML = '';
                }
                gameContainer.appendChild(boardGridItem);
            }
        })
    })()

    const makeChoice = (() => {
        gameContainer.addEventListener('click', (event) => {
            event.target.innerHTML = `${player.playerTurn()}`;
            event.target.classList.add('checked');

            // Get current item nimber and save to board array
            const currentItemNumber = event.target.id.split('-')[1]
            gameBoard.setBoard(currentItemNumber)

            // Next turn
            game.nextTurn();
        })
    })()

    return { startGame, makeChoice }
})()