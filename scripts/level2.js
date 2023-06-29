function GameLevel2() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const scoreElement = document.getElementById('score');
  const highScoresList2 = document.getElementById('highScoresList2');
  const startButton = document.getElementById('startButton');
  const endButton = document.getElementById('endButton');

  let score = 0;
  let isGameRunning = false;
  const gameDuration = 60000; // 1 хвилина в мілісекундах
  const squareSize = 50;
  const squareSpeed = 2;
  let squareX = canvas.width / 2;
  let squareY = canvas.height / 2;

  let timerInterval; // Змінна для збереження ідентифікатора інтервалу таймера

  function handleClick(event) {
    if (isGameRunning) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (
        mouseX >= squareX - squareSize / 2 &&
        mouseX <= squareX + squareSize / 2 &&
        mouseY >= squareY - squareSize / 2 &&
        mouseY <= squareY + squareSize / 2
      ) {
        score += 2;
        scoreElement.textContent = 'Score: ' + score;
      }
    }
  }

  function update() {
    if (isGameRunning) {
      squareX -= squareSpeed;

      if (squareX + squareSize / 2 <= 0) {
        squareX = canvas.width + squareSize / 2;
        squareY = Math.random() * (canvas.height - squareSize) + squareSize / 2;
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isGameRunning) {
      ctx.fillStyle = 'black';
      ctx.fillRect(squareX - squareSize / 2, squareY - squareSize / 2, squareSize, squareSize);
    } else {
      ctx.font = '20px Arial';
      ctx.fillText('Click the Start button to begin the game', canvas.width / 2 - 160, canvas.height / 2);
    }
  }

  function startGame() {
    if (isGameRunning) return;

    isGameRunning = true;
    startButton.style.display = 'none';
    score = 0;
    scoreElement.textContent = 'Score: ' + score;

    let remainingTime = gameDuration;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = 'Time: ' + Math.floor(remainingTime / 1000) + 's';

    timerInterval = setInterval(() => {
      remainingTime -= 1000;
      timerElement.textContent = 'Time: ' + Math.floor(remainingTime / 1000) + 's';

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        isGameRunning = false;
        startButton.style.display = 'block';
        updateHighScores(score);
        alert('Game over! Your score: ' + score);
      }
    }, 1000);
  }

  function updateHighScores(newScore) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(newScore);
    highScores.sort((a, b) => b - a);
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));

    highScoresList2.innerHTML = '';
    highScores.forEach((highScore, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = highScore;
      highScoresList2.appendChild(listItem);
    });
  }

  function endGameLevel2() {
    if (isGameRunning) {
      clearInterval(timerInterval);
      isGameRunning = false;
      startButton.style.display = 'block';
      updateHighScores(score);
      alert('Game over! Your score: ' + score);
      
    }
  }

  canvas.addEventListener('click', handleClick);

  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  startButton.addEventListener('click', startGame);
  endButton.addEventListener('click', endGameLevel2);

  gameLoop();
}

document.getElementById('level2Button').addEventListener('click', GameLevel2);
