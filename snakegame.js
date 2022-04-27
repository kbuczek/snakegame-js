let canvas = document.getElementById("canvas");
let score = document.getElementById("score");

const ROWS = 20;
const COLUMNS = 20;
const CELL_SIZE = 25;

let cells = new Map();
let nonEmptyKeys = new Set();
let interval;

let SNAKE_HEAD = "10-10";
let SNAKE_DIRECTION = "R";

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
      let key = toKey(i, j);
      cells.set(key, cell);
      canvas.appendChild(cell);
    }
  }
}

function generateFood() {}

function renderFrame() {
  let [row, col] = fromKey(SNAKE_HEAD);
  const cell = cells.get(SNAKE_HEAD);
  cell.style.backgroundColor = "Chartreuse";
  cell.style.borderRadius = "7px";
  cell.style.border = "0.5px solid black";
  [row, col] = moveSnakeInDirection(row, col);
  console.log(row, col);
  SNAKE_HEAD = toKey(row, col);
}

function moveSnakeInDirection(row, col) {
  switch (SNAKE_DIRECTION) {
    case "up":
      row--;
      break;
    case "right":
      col++;
      break;
    case "down":
      row++;
      break;
    case "left":
      col--;
      break;
  }
  return [row, col];
}

window.addEventListener("keydown", (e) => {
  e.preventDefault();
  switch (e.key) {
    case "ArrowUp":
    case "w":
    case "W":
      SNAKE_DIRECTION = "up";
      break;
    case "ArrowRight":
    case "d":
    case "D":
      SNAKE_DIRECTION = "right";
      break;
    case "ArrowDown":
    case "s":
    case "S":
      SNAKE_DIRECTION = "down";
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      SNAKE_DIRECTION = "left";
      break;
  }
});

function startGame() {
  initializeGameBoard();
  score.textContent = "0";
  interval = setInterval(renderFrame, 300);
}

function endGame() {
  clearInterval(interval);
}

startGame();
