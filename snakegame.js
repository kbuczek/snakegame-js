let canvas = document.getElementById("canvas");

const ROWS = 20;
const COLUMNS = 20;
const CELL_SIZE = 24;
let SNAKE_DIRECTION = "E";
let cells = new Map();
let interval;

let CELL_KEY = "0-0";

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
      let key = toKey(i, j);
      cells.set(key, cell);
      canvas.appendChild(cell);
    }
  }
}

function renderFrame() {
  let [row, col] = fromKey(CELL_KEY);
  const cell = cells.get(CELL_KEY);
  cell.style.backgroundColor = "white";
  col++;
  CELL_KEY = toKey(row, col);
}

function setSnakeDirection() {}

function startGame() {
  interval = setInterval(renderFrame, 300);
}

initializeGameBoard();
startGame();
