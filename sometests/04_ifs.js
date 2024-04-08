const board = [['X', false, false], [false, 'X', false], [false, false, 'O']];
    if ((board[0][0] === board[1][1] && board[1][1] === board[2][2])) {
        console.log('win')
    }
