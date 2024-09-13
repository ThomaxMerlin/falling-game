// script.js

const gameArea = document.getElementById('game');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-game-btn');

let basketSpeed = 20;
let gameInterval;
let fallingObjects = [];
let score = 0;
let isGameRunning = false;

function startGame() {
  if (isGameRunning) return;
  isGameRunning = true;

  // Reset score
  score = 0;
  scoreDisplay.textContent = score;

  // Clear falling objects
  fallingObjects.forEach(obj => obj.remove());
  fallingObjects = [];

  // Start generating falling objects
  gameInterval = setInterval(() => {
    createFallingObject();
    moveFallingObjects();
  }, 1000 / 30); // 30 frames per second
}

function createFallingObject() {
  const fallingObject = document.createElement('div');
  fallingObject.classList.add('falling-object');
  fallingObject.style.left = `${Math.random() * 370}px`; // Randomize position
  fallingObject.style.top = '0px';

  gameArea.appendChild(fallingObject);
  fallingObjects.push(fallingObject);
}

function moveFallingObjects() {
  fallingObjects.forEach((obj, index) => {
    let currentTop = parseFloat(obj.style.top);
    if (currentTop > 560) {
      // Check if object is caught by the basket
      const basketLeft = parseFloat(basket.style.left) || 160;
      const objLeft = parseFloat(obj.style.left);
      if (objLeft > basketLeft && objLeft < basketLeft + 80) {
        score++;
        scoreDisplay.textContent = score;
      }
      obj.remove();
      fallingObjects.splice(index, 1);
    } else {
      obj.style.top = `${currentTop + 5}px`;
    }
  });
}

function moveBasket(e) {
  let basketLeft = parseFloat(basket.style.left) || 160;
  if (e.key === 'ArrowLeft' && basketLeft > 0) {
    basket.style.left = `${basketLeft - basketSpeed}px`;
  } else if (e.key === 'ArrowRight' && basketLeft < 320) {
    basket.style.left = `${basketLeft + basketSpeed}px`;
  }
}

// Event listeners
document.addEventListener('keydown', moveBasket);
startButton.addEventListener('click', startGame);
