let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;
let aiMode = false;
let aiDifficulty = "easy";
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = Array.from(document.querySelectorAll('.cell'));
const xWins = document.getElementById("x-wins");
const oWins = document.getElementById("o-wins");
const ties = document.getElementById("ties");
const notification = document.getElementById("notification");
const modeDisplay = document.getElementById("selected-mode");
const gameStatus = document.getElementById("game-status");

document.getElementById("restart-btn").addEventListener('click', restartGame);
document.getElementById("multiplayer-btn").addEventListener('click', () => setMode(false));
document.getElementById("ai-btn").addEventListener('click', () => setMode(true));
document.getElementById("difficulty").addEventListener('change', (e) => aiDifficulty = e.target.value);

cells.forEach((cell, index) => cell.addEventListener('click', () => handleCellClick(index)));

function setMode(isAiMode) {
    aiMode = isAiMode;
    document.getElementById('difficulty-selection').classList.toggle('hidden', !aiMode);
    modeDisplay.textContent = isAiMode ? 'Computer Mode' : 'Multiplayer Mode';
    restartGame();
}

function handleCellClick(index) {
    if (board[index] !== "" || !gameActive) return;

    playMove(index, currentPlayer);
    if (aiMode && gameActive) setTimeout(aiPlay, 500);
}

function playMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
    cells[index].dataset.player = player;

    if (checkWin(player)) {
        endGame(player);
    } else if (board.includes("")) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        gameStatus.textContent = `Next turn: Player ${currentPlayer}`;
    } else {
        endGame(null);
    }
}

function checkWin(player) {
    return winningConditions.some(condition =>
        condition.every(index => board[index] === player)
    );
}

function endGame(winner) {
    gameActive = false;
    gameStatus.textContent = winner ? `Player ${winner} wins!` : `It's a tie!`;
    if (winner) {
        winner === "X" ? xWins.textContent++ : oWins.textContent++;
    } else {
        ties.textContent++;
    }
}

function restartGame() {
    board.fill("");
    gameActive = true;
    currentPlayer = "X";
    cells.forEach(cell => {
        cell.textContent = "";
        delete cell.dataset.player;
    });
    gameStatus.textContent = `Next turn: Player X`;
    showNotification('Game restarted!');
}

function aiPlay() {
    const bestMove = aiDifficulty === 'easy' ? randomMove() : minimaxMove();
    playMove(bestMove, "O");
}

function randomMove() {
    const availableMoves = board
        .map((cell, index) => cell === "" ? index : null)
        .filter(index => index !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function minimaxMove() {
    let bestMove = -1;
    let bestValue = -Infinity;
    board.forEach((cell, index) => {
        if (cell === "") {
            board[index] = "O";
            const moveValue = minimax(board, 0, false);
            board[index] = "";
            if (moveValue > bestValue) {
                bestMove = index;
                bestValue = moveValue;
            }
        }
    });
    return bestMove;
}

function minimax(newBoard, depth, isMaximizing) {
    const winner = checkWin("O") ? "O" : checkWin("X") ? "X" : null;
    if (winner) return winner === "O" ? 10 - depth : depth - 10;
    if (!newBoard.includes("")) return 0;

    let bestValue = isMaximizing ? -Infinity : Infinity;
    newBoard.forEach((cell, index) => {
        if (cell === "") {
            newBoard[index] = isMaximizing ? "O" : "X";
            const value = minimax(newBoard, depth + 1, !isMaximizing);
            newBoard[index] = "";
            bestValue = isMaximizing
                ? Math.max(value, bestValue)
                : Math.min(value, bestValue);
        }
    });
    return bestValue;
}
