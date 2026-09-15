const gameSeq = [];
let userSeq = [];
const colors = ["green", "red", "yellow", "blue"];
let started = false;
let level = 0;

const heading = document.querySelector("h2");
const startButton = document.querySelector("#start-btn");
const squares = document.querySelectorAll(".square");

function flash(button, className) {
  button.classList.add(className);
  setTimeout(() => button.classList.remove(className), 250);
}

function playSequence() {
  gameSeq.forEach((color, index) => {
    const button = document.querySelector(`.${color}`);
    setTimeout(() => flash(button, "game-flash"), (index + 1) * 500);
  });
}

function levelUp() {
  userSeq = [];
  level++;
  heading.innerText = `Level ${level}`;

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gameSeq.push(randomColor);
  playSequence();
}

function startGame() {
  if (started) return;

  started = true;
  level = 0;
  gameSeq.length = 0;
  heading.innerText = "Watch the sequence";
  setTimeout(levelUp, 300);
}

function checkAnswer(index) {
  if (userSeq[index] !== gameSeq[index]) {
    heading.innerText = `Game over! You reached level ${level}. Press Start Game or any key to try again.`;
    started = false;
    return;
  }

  if (userSeq.length === gameSeq.length) {
    heading.innerText = "Correct!";
    setTimeout(levelUp, 800);
  }
}

function handleSquareClick(event) {
  if (!started) return;

  const button = event.currentTarget;
  flash(button, "user-flash");
  userSeq.push(button.dataset.color);
  checkAnswer(userSeq.length - 1);
}

startButton.addEventListener("click", startGame);
squares.forEach((square) => square.addEventListener("click", handleSquareClick));
document.addEventListener("keydown", startGame);
