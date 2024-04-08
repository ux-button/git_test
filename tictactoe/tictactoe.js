function Game () {
    const checkWin = function (boardState) {
        switch (true) {
            case boardState[0][0] === boardState[0][1] === boardState[0][2]:

        }
    }
    return {

    }
}

function GameBoard () {
    let board = [[false, false, false], [false, false, false], [false, false, false]];

    const setMark = function (mark, horizontal, vertical) {
        board[vertical][horizontal] = mark;
    }

    const getBoard = () => board;

    return {
        setMark, getBoard
    }
}