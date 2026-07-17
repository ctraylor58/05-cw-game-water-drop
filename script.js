// Variables to control game state
let gameRunning = false; // Keeps track of whether game is active or not
let dropMaker; // Will store our timer that creates drops regularly

let score = 0;
let timeLeft = 30;
let timer;

const winningMessages = [
  "Amazing! You collected enough clean water!",
  "Great job! Every drop counts!",
  "You helped bring clean water to more people!"
];

const losingMessages = [
  "Keep trying! Every drop matters.",
  "Almost! Try again.",
  "Don't give up—clean water needs heroes!"
];

// Wait for button click to start the game
document.getElementById("start-btn").addEventListener("click", startGame);

function startGame() {
  // Prevent multiple games from running at once
  if (gameRunning) return;

  gameRunning = true;

  score = 0;
  timeLeft = 30;

  document.getElementById("score").textContent = score;
  document.getElementById("time").textContent = timeLeft;

  document.getElementById("game-container").innerHTML = "";

  // Create new drops every second (1000 milliseconds)
  dropMaker = setInterval(createDrop, 1000);

   // Countdown timer
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function createDrop() {
  // Create a new div element that will be our water drop
  const drop = document.createElement("div");
  const badDrop = Math.random() < 0.2;

  drop.className = badDrop ? "water-drop bad-drop" : "water-drop";

  // Make drops different sizes for visual variety
  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;
  drop.style.width = drop.style.height = `${size}px`;

  // Position the drop randomly across the game width
  // Subtract 60 pixels to keep drops fully inside the container
  const gameWidth = document.getElementById("game-container").offsetWidth;
  const xPosition = Math.random() * (gameWidth - 60);
  drop.style.left = xPosition + "px";

  // Make drops fall for 4 seconds
  drop.style.animationDuration = "4s";

  // Add the new drop to the game screen
  document.getElementById("game-container").appendChild(drop);

  drop.addEventListener("click", () => {
    if (badDrop) {
      score--;
    } else {
      score++;
    }

    document.getElementById("score").textContent = score;
    drop.remove();
  });
  
  // Remove drops that reach the bottom (weren't clicked)
  drop.addEventListener("animationend", () => {
    drop.remove(); // Clean up drops that weren't caught
  });
}

function endGame() {
  gameRunning = false;

  clearInterval(dropMaker);
  clearInterval(timer);

  const container = document.getElementById("game-container");
  container.innerHTML = "";

  let message;

  if (score >= 20) {
    message = winningMessages[
      Math.floor(Math.random() * winningMessages.length)
    ];
  } else {
    message = losingMessages[
      Math.floor(Math.random() * losingMessages.length)
    ];
  }

  document.getElementById("game-message").textContent = message;
}
