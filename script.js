let board = Array(9).fill("");  // Cleaner initialization
let currentPlayer = "X";
let gameActive = true;
let aiMode = false;
let aiDifficulty = "easy";
const scores = { X: 0, O: 0, T: 0 }; // Track wins/ties

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
  [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const xWins = document.getElementById("x-wins");
const oWins = document.getElementById("o-wins");
const ties = document.getElementById("ties");
const notification = document.getElementById("notification");

document.getElementById("restart-btn").addEventListener('click', restartGame);
document.getElementById("multiplayer-btn").addEventListener('click', () => setMode(false));
document.getElementById("ai-btn").addEventListener('click', () => setMode(true));
document.getElementById("difficulty").addEventListener('change', (e) => aiDifficulty = e.target.value);

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function setMode(isAiMode) {
  aiMode = isAiMode;
  document.getElementById('difficulty-selection').classList.toggle('hidden', !aiMode);
  restartGame();
}

function handleCellClick(event) {
  const index = +event.target.id.split('-')[1];
  
  if (board[index] !== "" || !gameActive) return;
  
  playMove(index, currentPlayer);

  if (aiMode && gameActive) setTimeout(aiPlay, 500);
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
  const message = winner ? `Player ${winner} wins!` : `It's a tie!`;
  showNotification(message);

  if (winner) {
    scores[winner]++;
    winner === "X" ? xWins.textContent = scores.X : oWins.textContent = scores.O;
  } else {
    scores.T++;
    ties.textContent = scores.T;
  }
}

function showNotification(message) {
  notification.textContent = message;
  notification.classList.remove('hidden');
  setTimeout(() => notification.classList.add('hidden'), 2000);
}

function restartGame() {
  board.fill("");
  gameActive = true;
  currentPlayer = "X";
  cells.forEach(cell => {
    cell.textContent = "";
    delete cell.dataset.player;
  });
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
