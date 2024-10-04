let currentPlayer = 'X';
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let currentMode = null;

function selectMode(mode) {
    currentMode = mode;
    let modeText = (mode === 'multiplayer') ? 'Multiplayer' : 'AI Mode';
    document.getElementById('selected-mode').textContent = 'Selected Mode: ' + modeText;
    
    // Reset the game when a new mode is selected
    resetGame();
}

function makeMove(row, col) {
    if (board[row][col] !== '' || currentMode === null) {
        alert('Invalid move or mode not selected!');
        return;
    }

    board[row][col] = currentPlayer;
    document.querySelectorAll('.row')[row].children[col].textContent = currentPlayer;

    if (checkWinner()) {
        alert(currentPlayer + ' wins!');
        resetGame();
        return;
    }

    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';

    if (currentMode === 'ai' && currentPlayer === 'O') {
        aiMove();
    }
}

function aiMove() {
    // Simple AI logic for making a move
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                board[i][j] = currentPlayer;
                document.querySelectorAll('.row')[i].children[j].textContent = currentPlayer;

                if (checkWinner()) {
                    alert(currentPlayer + ' wins!');
                    resetGame();
                    return;
                }

                currentPlayer = 'X';
                return;
            }
        }
    }
}

function checkWinner() {
    // Check rows, columns, and diagonals
    for (let i = 0; i < 3; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) return true;
        if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) return true;
    }
    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) return true;
    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) return true;

    return false;
}

function resetGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}
