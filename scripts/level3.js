function GameLevel3() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const scoreElement = document.getElementById('score');
  const highScoresList3 = document.getElementById('highScoresList3');
  const startButton = document.getElementById('startButton');
  const endButton = document.getElementById('endButton');

  let score = 0;
  let isGameRunning = false;
  const gameDuration = 60000; // 1 хвилина в мілісекундах
  const squareSize = 50;
  const squareSpeed = 3;
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
        score += 3; // Збільшуємо кількість очків за клік на квадрат на 3
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
    endButton.style.display = 'block';
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
        endButton.style.display = 'none';
        updateHighScores(score);
        alert('Game over! Your score: ' + score);
      }
    }, 1000);
  }

  function endGame() {
    if (!isGameRunning) return;

    clearInterval(timerInterval);
    isGameRunning = false;
    startButton.style.display = 'block';
    endButton.style.display = 'none';
    updateHighScores(score);
    alert('Game over! Your score: ' + score);
    
  }

  function updateHighScores(newScore) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(newScore);
    highScores.sort((a, b) => b - a);
    highScores.splice(10);

    localStorage.setItem('highScores', JSON.stringify(highScores));

    highScoresList3.innerHTML = highScores
      .map((score, index) => `<li>${score}</li>`)
      .join('');
  }

  canvas.addEventListener('click', handleClick);

  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  startButton.addEventListener('click', startGame);
  endButton.addEventListener('click', endGame);

  gameLoop();
}

const level3Button = document.getElementById('level3Button');
level3Button.addEventListener('click', GameLevel3);
