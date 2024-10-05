let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let computerMode = false;
let computerDifficulty = "easy";
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

const cells = document.querySelectorAll('.cell');
const xWins = document.getElementById("x-wins");
const oWins = document.getElementById("o-wins");
const ties = document.getElementById("ties");
const notification = document.getElementById("notification");
const modeDisplay = document.getElementById("selected-mode");
const gameStatus = document.getElementById("game-status"); // Game status prompt

document.getElementById("restart-btn").addEventListener('click', restartGame);
document.getElementById("multiplayer-btn").addEventListener('click', () => setMode(false));
document.getElementById("computer-btn").addEventListener('click', () => setMode(true));
document.getElementById("difficulty").addEventListener('change', (e) => computerDifficulty = e.target.value);

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function setMode(isComputerMode) {
    computerMode = isComputerMode;
    document.getElementById('difficulty-selection').classList.toggle('hidden', !computerMode);
    modeDisplay.textContent = isComputerMode ? 'Computer Mode' : 'Multiplayer Mode'; // Update mode display
    restartGame();
}

function handleCellClick(event) {
    const index = +event.target.id.split('-')[1];
    if (board[index] !== "" || !gameActive) return;

    playMove(index, currentPlayer);

    if (computerMode && gameActive) setTimeout(computerPlay, 500); // Computer move delay
}

function playMove(index, player) {
    board[index] = player;
    const cell = document.getElementById(`cell-${index}`);
    cell.textContent = player;
    cell.dataset.player = player;

    if (checkWin(player)) {
        endGame(player);
    } else if (board.includes("")) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        gameStatus.textContent = `Next turn: Player ${currentPlayer}`; // Update game status
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
    if (winner) {
        gameStatus.textContent = `Player ${winner} wins!`; // Show winner
        winner === "X" ? xWins.textContent++ : oWins.textContent++;
    } else {
        gameStatus.textContent = `It's a tie!`; // Show tie
        ties.textContent++;
    }
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    cells.forEach(cell => {
        cell.textContent = "";
        delete cell.dataset.player;
    });
    gameStatus.textContent = `Next turn: Player X`; // Reset game status
    showNotification('Game restarted!');
}

function computerPlay() {
    const bestMove = computerDifficulty === 'easy' ? randomMove() : minimaxMove();
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

    if (isMaximizing) {
        let bestValue = -Infinity;
        newBoard.forEach((cell, index) => {
            if (cell === "") {
                newBoard[index] = "O";
                const value = minimax(newBoard, depth + 1, false);
                newBoard[index] = "";
                bestValue = Math.max(value, bestValue);
            }
        });
        return bestValue;
    } else {
        let bestValue = Infinity;
        newBoard.forEach((cell, index) => {
            if (cell === "") {
                newBoard[index] = "X";
                const value = minimax(newBoard, depth + 1, true);
                newBoard[index] = "";
                bestValue = Math.min(value, bestValue);
            }
        });
        return bestValue;
    }
}
