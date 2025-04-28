let cells = document.querySelectorAll('.cell');
let statusText = document.getElementById('status');
let resetButton = document.getElementById('reset');

let currentPlayer = '❌';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function handleCellClick(e) {
  const clickedCell = e.target;
  const clickedIndex = clickedCell.getAttribute('data-index');

  if (gameState[clickedIndex] !== "" || !gameActive) {
    return;
  }

  gameState[clickedIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  checkWinner();
}

function checkWinner() {
  let roundWon = false;

  for (let condition of winningConditions) {
    let [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Pemain ${currentPlayer} Menang! 🎉`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "Seri! 😐";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "❌" ? "⭕" : "❌";
  statusText.textContent = `Giliran: ${currentPlayer}`;
}

function resetGame() {
  currentPlayer = '❌';
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `Giliran: ${currentPlayer}`;
  cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
