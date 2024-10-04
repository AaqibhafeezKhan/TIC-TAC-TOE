let board = ["", "", "", "", "", "", "", "", ""];
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
const xWins = document.getElementById("x-wins");
const oWins = document.getElementById("o-wins");
const ties = document.getElementById("ties");

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById("restart-btn").addEventListener('click', restartGame);
document.getElementById("multiplayer-btn").addEventListener('click', () => setMode(false));
document.getElementById("ai-btn").addEventListener('click', () => setMode(true));
document.getElementById("difficulty").addEventListener('change', (e) => aiDifficulty = e.target.value);

function setMode(isAiMode) {
    aiMode = isAiMode;
    restartGame();
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.id.split('-')[1]);

    if (board[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    playMove(clickedCell, clickedCellIndex);

    if (aiMode && gameActive) {
        setTimeout(() => aiPlay(), 500); // AI makes a move after 500ms
    }
}

function playMove(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    if (checkWin()) {
        endGame(currentPlayer);
    } else if (board.includes("")) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    } else {
        endGame(null);
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function endGame(winner) {
    gameActive = false;
    if (winner) {
        winner === "X" ? xWins.textContent++ : oWins.textContent++;
        alert(`Player ${winner} wins!`);
    } else {
        ties.textContent++;
        alert('It\'s a tie!');
    }
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = "");
}

function aiPlay() {
    let bestMove = -1;
    let bestValue = -Infinity;

    board.forEach((cell, index) => {
        if (cell === "") {
            board[index] = "O";
            let moveValue = minimax(board, 0, false);
            board[index] = "";

            if (moveValue > bestValue) {
                bestMove = index;
                bestValue = moveValue;
            }
        }
    });

    playMove(document.getElementById(`cell-${bestMove}`), bestMove);
}

function minimax(newBoard, depth, isMaximizing) {
    if (checkWin()) return isMaximizing ? -10 : 10;
    if (!newBoard.includes("")) return 0;

    if (isMaximizing) {
        let bestValue = -Infinity;
        newBoard.forEach((cell, index) => {
            if (cell === "") {
                newBoard[index] = "O";
                let value = minimax(newBoard, depth + 1, false);
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
                let value = minimax(newBoard, depth + 1, true);
                newBoard[index] = "";
                bestValue = Math.min(value, bestValue);
            }
        });
        return bestValue;
    }
}
