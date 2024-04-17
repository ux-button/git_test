const game = (() => {
    let turn = 0;

    const startGame = () => {
        turn = 0;
    }

    // Turn getter setter
    const getTurn = () => turn;
    const nextTurn = () => {
        // Check win situation
        if (checkGameOver(gameBoard.getBoard(), player.playerTurn())) {
            alert(`Player ${player.playerTurn()} wins!`);
            gameDisplay.viewGameOver();
        }

        // Check draw
        if (getTurn() >= (gameBoard.getBoard().length - 1)) {
            alert(`Game over in a draw!`);
            gameDisplay.viewGameOver();
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

    return { startGame, getTurn, nextTurn, checkGameOver }
})()


// Game board
const gameBoard = (() => {
    // Create empty board
    let currentBoard = [];

    const getBoard = () => currentBoard;
    const setBoard = (item) => {
        currentBoard[item] = player.playerTurn();
    }
    const resetBoard = () => {
        currentBoard = [false, false, false, false, false, false, false, false, false];
    }

    return { getBoard, setBoard, resetBoard }
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
    let actionButton = '';
    let gameBoardContainer = '';

    // Create button with event handler
    const createButton = (nameOnButton, buttonId) => {
        const button = document.createElement('button');
        button.setAttribute('id', buttonId);
        button.textContent = nameOnButton;
        document.querySelector('body').appendChild(button);
        document.getElementById(buttonId).addEventListener('click', startGame);
    }

    // Create button after DOM loaded
    const gameLoaded = (() => {
        document.addEventListener('DOMContentLoaded', () => {
            createButton('Start Game', 'start');
        }
    )})()

    // Create game field
    const startGame = () => {

        // Zeroing score and board
        game.startGame();
        gameBoard.resetBoard();

        // Delete the button
        actionButton.remove();

        // Create container for grid
        gameBoardContainer = document.createElement('div')
        gameBoardContainer.setAttribute('id', 'game-container')
        document.querySelector('body').appendChild(gameBoardContainer)

        // Create grid inside container
        for (let i = 0; i < gameBoard.getBoard().length; i++) {
            const boardGridItem = document.createElement('div')
            boardGridItem.setAttribute('id', `gameitem-${i}`)
            boardGridItem.classList.add('game-grid-item');
            if (!i) {
                boardGridItem.textContent = '';
            }
            gameBoardContainer.appendChild(boardGridItem);
        }
        gameBoardContainer.addEventListener('click', makeChoice)
    }

    // Pick cell handler
    const makeChoice = (event) => {
        event.target.textContent = `${player.playerTurn()}`;
        event.target.classList.add('checked');

        // Get current item nimber and save to board array
        const currentItemNumber = event.target.id.split('-')[1]
        gameBoard.setBoard(currentItemNumber)

        // Next turn
        game.nextTurn();
    }

    // Ending game
    const viewGameOver = () => {
        gameBoardContainer.remove();
        createButton('Restart game', 'restart');
    }

    return { startGame, viewGameOver }
})()