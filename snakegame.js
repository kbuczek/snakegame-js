const canvas = document.getElementById("canvas");
const score = document.getElementById("score");
const message = document.getElementById("message");

const ROWS = 20;
const COLUMNS = 20;
const CELL_SIZE = 25;

let cells = new Map(); //divs
let cellsValues = new Map();
let interval;
let foodKey = generateFood();
let gameScore = 0;
let key_pressed = false;

let SNAKE_HEAD = "10-10";
let SNAKE_DIRECTION = "left";
let SNAKE_ENLARGE = false;
let SNAKE_BODY = ["10-11", "10-12", "10-13", "10-14"];

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
  //check snake head and body overlap
  // const newFoodKey
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

function snakeCollision() {
  const cellValue = cellsValues.get(SNAKE_HEAD);
  if (cellValue === "snake-body") {
    endGame();
  }
  if (cellValue === "food") {
    gameScore++;
    SNAKE_ENLARGE = true;
    cellsValues.delete(foodKey);
    foodKey = generateFood();
    cellsValues.set(foodKey, "food");
  }
  console.log(fromKey(SNAKE_HEAD));
  if (!isInBounds(fromKey(SNAKE_HEAD))) {
    console.log("AAA");
    endGame();
  }
}

function snakeLogic() {
  cellsValues.set(SNAKE_HEAD, "snake-head");
  SNAKE_BODY.forEach((item) => {
    cellsValues.set(item, "snake-body");
  });

  SNAKE_BODY.unshift(SNAKE_HEAD);
  if (!SNAKE_ENLARGE) {
    const lastSnakeBodyKey = SNAKE_BODY.pop();
    cellsValues.delete(lastSnakeBodyKey);
  }
  SNAKE_ENLARGE = false;

  let [row, col] = fromKey(SNAKE_HEAD);
  [row, col] = moveSnakeInDirection(row, col);
  SNAKE_HEAD = toKey(row, col);
}

function prepareCellsValues() {
  snakeCollision();
  snakeLogic();
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
  key_pressed = false;
}

window.addEventListener("keydown", (e) => {
  // e.preventDefault();
  if (!key_pressed) {
    key_pressed = true;
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
  }
});

function startGame() {
  initializeGameBoard();
  cellsValues.set(foodKey, "food"); //add first food
  interval = setInterval(tick, 100);
}

function endGame() {
  clearInterval(interval);
  message.style.display = "flex";
}

startGame();
