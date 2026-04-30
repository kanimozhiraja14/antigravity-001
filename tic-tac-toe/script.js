const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    resetBtn.addEventListener('click', restartGame);
    updateStatus();
}

function cellClicked() {
    const cellIndex = this.getAttribute('data-index');

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    const span = document.createElement('span');
    span.textContent = currentPlayer;
    cell.appendChild(span);
    cell.classList.add(currentPlayer.toLowerCase());
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

function updateStatus() {
    if (gameActive) {
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
        statusText.style.color = currentPlayer === 'X' ? 'var(--x-color)' : 'var(--o-color)';
    }
}

function checkWinner() {
    let roundWon = false;
    let winningCells = [];

    for (let i = 0; i < winPatterns.length; i++) {
        const condition = winPatterns[i];
        const a = board[condition[0]];
        const b = board[condition[1]];
        const c = board[condition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            winningCells = condition;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} Wins!`;
        statusText.style.color = 'var(--win-color)';
        gameActive = false;
        
        // Highlight winning cells
        winningCells.forEach(index => {
            cells[index].classList.add('win');
        });
        return;
    }

    if (!board.includes('')) {
        statusText.textContent = 'Draw!';
        statusText.style.color = 'var(--text-color)';
        gameActive = false;
        return;
    }

    changePlayer();
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.className = 'cell'; // reset classes
    });
    
    updateStatus();
}

initializeGame();
