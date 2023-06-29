function GameLevel1() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const startButton = document.getElementById('startButton');
  const scoreElement = document.getElementById('score');
  const timerElement = document.getElementById('timer');
  const highScoresList1 = document.getElementById('highScoresList1');
  const clickSound = document.getElementById('clickSound');

  let score = 0;
  let isGameRunning = false;
  const gameDuration = 60000; // 1 хвилина в мілісекундах
  let highScores = [];
  let timerInterval; // Змінна для збереження ідентифікатора інтервалу таймера

  function handleClick(event) {
    if (isGameRunning) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const squareSize = 50;

      if (
        mouseX >= centerX - squareSize / 2 &&
        mouseX <= centerX + squareSize / 2 &&
        mouseY >= centerY - squareSize / 2 &&
        mouseY <= centerY + squareSize / 2
      ) {
        score++;
        scoreElement.textContent = 'Score: ' + score;
        clickSound.play();
      }
    }
  }

  canvas.addEventListener('click', handleClick);

  startButton.addEventListener('click', startGame);

  function startGame() {
    if (isGameRunning) return;

    isGameRunning = true;
    startButton.style.display = 'none';
    score = 0;
    scoreElement.textContent = 'Score: ' + score;

    let remainingTime = gameDuration;
    timerElement.textContent = 'Time: ' + Math.floor(remainingTime / 1000) + 's';

    timerInterval = setInterval(() => {
      remainingTime -= 1000;
      timerElement.textContent = 'Time: ' + Math.floor(remainingTime / 1000) + 's';

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        isGameRunning = false;
        startButton.style.display = 'block';
        updateHighScores();
        alert('Game over! Your score: ' + score);
      }
    }, 1000);

    gameLoop();
  }

  function updateHighScores() {
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 10);

    highScoresList1.innerHTML = '';
    highScores.forEach((highScore, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = highScore;
      highScoresList1.appendChild(listItem);
    });

    localStorage.setItem('highScores', JSON.stringify(highScores));
  }

  function update() {
    // Оновлення логіки гри
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isGameRunning) {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const squareSize = 50;

      ctx.fillStyle = 'black';
      ctx.fillRect(centerX - squareSize / 2, centerY - squareSize / 2, squareSize, squareSize);
    } else {
      ctx.font = '20px Arial';
      ctx.fillText('Click the Start button to begin the game', canvas.width / 2 - 160, canvas.height / 2);
    }
  }

  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  const endButton = document.getElementById('endButton');
  endButton.addEventListener('click', endGameLevel1);

  function endGameLevel1() {
    if (isGameRunning) {
      clearInterval(timerInterval);
      isGameRunning = false;
      startButton.style.display = 'block';
      updateHighScores();
      alert('Game over! Your score: ' + score);
    
    }
  }

}

document.getElementById('level1Button').addEventListener('click', GameLevel1);
