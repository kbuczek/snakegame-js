let canvas = document.getElementById("canvas");
let score = document.getElementById("score");

const ROWS = 20;
const COLUMNS = 20;
const CELL_SIZE = 25;

let cells = new Map(); //divs
let cellsValues = new Map();
let interval;
let foodKey = generateFood();
let gameScore = 0;

let SNAKE_HEAD = "10-10";
let SNAKE_DIRECTION = "left";
let SNAKE_LENGTH = 3;
let SNAKE_BODY = ["10-11", "10-12"];

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

function isInBounds([row, col]) {
  if (row < 0 || col < 0) {
    return false;
  }
  if (row >= ROWS || col >= COLUMNS) {
    return false;
  }
  return true;
}

function generateFood() {
  return toKey(
    Math.floor(Math.random() * ROWS),
    Math.floor(Math.random() * COLUMNS)
  );
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

function eatFood() {
  if (SNAKE_HEAD === foodKey) {
    gameScore++;
    let foodCell = cells.get(foodKey);
    foodCell.textContent = "";
    cellsValues.delete(foodKey);
    foodKey = generateFood();
  }
}

function prepareCellsValues() {
  cellsValues.set(foodKey, "food"); //add food
  eatFood();
  //prepare snake
  cellsValues.set(SNAKE_HEAD, "snake-head");
  SNAKE_BODY.forEach((item) => {
    cellsValues.set(item, "snake-body");
  });

  console.log(SNAKE_BODY);
  SNAKE_BODY.unshift(SNAKE_HEAD);
  const lastSnakeBodyKey = SNAKE_BODY.pop();
  cellsValues.delete(lastSnakeBodyKey);

  let [row, col] = fromKey(SNAKE_HEAD);
  [row, col] = moveSnakeInDirection(row, col);
  SNAKE_HEAD = toKey(row, col);
}

function renderCellsValues() {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      let key = toKey(i, j);
      let cellValue = cellsValues.get(key);
      let cell = cells.get(key);

      cell.textContent = "";
      cell.style.backgroundColor = "";
      cell.style.border = "";

      switch (cellValue) {
        case "food":
          cell.textContent = "🍎";
          break;
        case "snake-body":
          cell.style.backgroundColor = "#4a9400";
          cell.style.borderRadius = "7px";
          cell.style.border = "1px solid black";
          break;
        case "snake-head":
          cell.style.backgroundColor = "Chartreuse";
          cell.style.borderRadius = "7px";
          cell.style.border = "1px solid black";
          break;
        default:
          cell.textContent = "";
          break;
      }
    }
  }
}

function tick() {
  prepareCellsValues();
  renderCellsValues();
  score.textContent = gameScore;
}

window.addEventListener("keydown", (e) => {
  // e.preventDefault();
  switch (e.key) {
    case "ArrowUp":
    case "w":
    case "W":
      if (SNAKE_DIRECTION !== "down") {
        SNAKE_DIRECTION = "up";
      }
      break;
    case "ArrowRight":
    case "d":
    case "D":
      if (SNAKE_DIRECTION !== "left") {
        SNAKE_DIRECTION = "right";
      }
      break;
    case "ArrowDown":
    case "s":
    case "S":
      if (SNAKE_DIRECTION !== "up") {
        SNAKE_DIRECTION = "down";
      }
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      if (SNAKE_DIRECTION !== "right") {
        SNAKE_DIRECTION = "left";
      }
      break;
  }
});

function startGame() {
  initializeGameBoard();
  score.textContent = "0";
  interval = setInterval(tick, 150);
}

function endGame() {
  clearInterval(interval);
}

startGame();
