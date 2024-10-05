const cells = document.querySelectorAll('.cell');
const playerX = 'X';
const playerO = 'O';
let currentPlayer = playerX;
let gameState = ['', '', '', '', '', '', '', '', ''];

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

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || checkWin()) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        alert(`Player ${currentPlayer} wins!`);
        resetGame();
    } else if (gameState.every(cell => cell !== '')) {
        alert("It's a draw!");
        resetGame();
    } else {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = playerX;
    cells.forEach(cell => (cell.textContent = ''));
}

document.getElementById('reset-button').addEventListener('click', resetGame);

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
