function GameLevel4() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const scoreElement = document.getElementById('score');
  const highScoresList4 = document.getElementById('highScoresList4');
  const startButton = document.getElementById('startButton');
  const clickSound = document.getElementById('clickSound');
  const level4Button = document.getElementById('level4Button');
  const endButton = document.getElementById('endButton');
  let timerInterval; // Змінна для збереження інтервалу таймера

  let score = 0;
  let isGameRunning = false;
  const gameDuration = 60000; // 1 хвилина в мілісекундах
  const squareSize = 50;
  let squareSpeed = 1;
  let squareX = canvas.width / 2;
  let squareY = canvas.height / 2;
  let squareDirection = 1;
  let squareDirectionX = 1;
  let squareDirectionY = 1;

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
        score += 4; // Додаємо 4 очки за клік на квадрат
        scoreElement.textContent = 'Score: ' + score;
        // Відтворення звукового ефекту
        clickSound.play();
      }
    }
  }

  function update() {
    if (isGameRunning) {
      // Рух квадрату вліво та вправо
      squareX += squareSpeed * squareDirectionX;
      squareY += squareSpeed * squareDirectionY;

      // Перевірка, чи квадрат досяг краю canvas
      if (squareX <= 0 || squareX >= canvas.width - squareSize) {
        squareDirectionX *= -1;
      }

      if (squareY <= 0 || squareY >= canvas.height - squareSize) {
        squareDirectionY *= -1;
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
    const level = 4;
    const maxSpeed = 15;
    squareSpeed = maxSpeed / level;

    if (isGameRunning) return;

    isGameRunning = true;
    startButton.style.display = 'none';
    level4Button.style.display = 'none';
    endButton.style.display = 'inline';
    score = 0;
    scoreElement.textContent = 'Score: ' + score;

    let remainingTime = gameDuration;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = 'Time: ' + (remainingTime / 1000) + 's';

    timerInterval = setInterval(() => {
      remainingTime -= 1000;
      timerElement.textContent = 'Time: ' + (remainingTime / 1000) + 's';

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        isGameRunning = false;
        startButton.style.display = 'block';
        level4Button.style.display = 'inline';
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
    level4Button.style.display = 'inline';
    endButton.style.display = 'none';
    updateHighScores(score);
  }

  function updateHighScores(newScore) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(newScore);
    highScores.sort((a, b) => b - a);
    highScores.splice(10);

    localStorage.setItem('highScores', JSON.stringify(highScores));

    highScoresList4.innerHTML = highScores
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

const level4Button = document.getElementById('level4Button');
level4Button.addEventListener('click', GameLevel4);
