let canvas = document.getElementById("canvas");

const ROWS = 20;
const COLUMNS = 20;
const CELL_SIZE = 24;
let SNAKE_DIRECTION = "E";
let cells = new Map();
let interval;

function toKey(row, col) {
  return row + "-" + col;
}

function fromKey(key) {
  return key.split("-").map(Number);
}

function initializeGameBoard() {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      const cell = document.createElement("div");
      cell.style.float = "left";
      cell.style.width = CELL_SIZE + "px";
      cell.style.height = CELL_SIZE + "px";
      cell.style.border = "1px solid white";
      cells.set;
      canvas.appendChild(cell);
    }
  }
}

function renderFrame() {}

function setSnakeDirection() {}

function startGame() {
  interval = setInterval(renderFrame, 300);
}

initializeGameBoard();
startGame();
