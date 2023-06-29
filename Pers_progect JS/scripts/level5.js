function GameLevel5() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const scoreElement = document.getElementById('score');
  const highScoresList5 = document.getElementById('highScoresList5');
  const startButton = document.getElementById('startButton');
  const clickSound = document.getElementById('clickSound');
  const level5Button = document.getElementById('level5Button');
  const endButton = document.getElementById('endButton');
  let timerInterval; // Змінна для збереження інтервалу таймера

  let score = 0; // Змінна для збереження поточного рахунку гравця
  let isGameRunning = false; // Змінна, що вказує, чи триває гра
  const gameDuration = 60000; // 1 хвилина в мілісекундах
  const squareSize = 50; // Розмір квадрата
  let squareSpeed = 1; // Швидкість руху квадрата
  let squareX = canvas.width / 2; // Початкове положення квадрата по осі X
  let squareY = canvas.height / 2; // Початкове положення квадрата по осі Y
  let squareDirectionX = 1; // Напрямок руху квадрата по осі X (1 - праворуч, -1 - ліворуч)
  let squareDirectionY = 1; // Напрямок руху квадрата по осі Y (1 - вниз, -1 - вгору)

  function handleClick(event) {
    if (isGameRunning) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Перевіряємо, чи користувач клікнув на квадрат
      if (
        mouseX >= squareX - squareSize / 2 &&
        mouseX <= squareX + squareSize / 2 &&
        mouseY >= squareY - squareSize / 2 &&
        mouseY <= squareY + squareSize / 2
      ) {
        score += 5; // Додаємо 5 очок за клік на квадрат
        scoreElement.textContent = 'Score: ' + score;
        // Відтворення звукового ефекту
        clickSound.play();
      }
    }
  }

  function update() {
    if (isGameRunning) {
      // Рух квадрата вліво та вправо
      squareX += squareSpeed * squareDirectionX;
      squareY += squareSpeed * squareDirectionY;

      // Перевірка, чи квадрат досяг краю canvas
      if (squareX <= 0 || squareX >= canvas.width - squareSize) {
        squareDirectionX *= -1; // Зміна напрямку руху квадрата по осі X
      }

      if (squareY <= 0 || squareY >= canvas.height - squareSize) {
        squareDirectionY *= -1; // Зміна напрямку руху квадрата по осі Y
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isGameRunning) {
      // Відображення квадрата
      ctx.fillStyle = 'black';
      ctx.fillRect(squareX - squareSize / 2, squareY - squareSize / 2, squareSize, squareSize);
    } else {
      // Відображення тексту "Click the Start button to begin the game" при завершені гри
      ctx.font = '20px Arial';
      ctx.fillText('Click the Start button to begin the game', canvas.width / 2 - 160, canvas.height / 2);
    }
  }

  function startGame() {
    const level = 5; // Рівень гри
    const maxSpeed = 25; // Максимальна швидкість руху квадрата
    squareSpeed = maxSpeed / level; // Встановлюємо швидкість руху квадрата в залежності від рівня гри

    if (isGameRunning) return; // Якщо гра вже триває, виходимо з функції

    isGameRunning = true; // Позначаємо, що гра почалася
    startButton.style.display = 'none'; // Ховаємо кнопку "Start"
    level5Button.style.display = 'none'; // Ховаємо кнопку "Level 5"
    endButton.style.display = 'inline'; // Показуємо кнопку "End"
    score = 0; // Скидаємо рахунок
    scoreElement.textContent = 'Score: ' + score; // Оновлюємо відображення рахунку

    let remainingTime = gameDuration; // Залишковий час гри
    const timerElement = document.getElementById('timer');
    timerElement.textContent = 'Time: ' + (remainingTime / 1000) + 's';

    timerInterval = setInterval(() => {
      remainingTime -= 1000; // Зменшуємо залишковий час на 1 секунду (1000 мілісекунд)
      timerElement.textContent = 'Time: ' + (remainingTime / 1000) + 's';

      // Якщо залишковий час закінчився
      if (remainingTime <= 0) {
        clearInterval(timerInterval); // Зупиняємо таймер
        isGameRunning = false; // Позначаємо, що гра завершилась
        startButton.style.display = 'block'; // Показуємо кнопку "Start"
        level5Button.style.display = 'inline'; // Показуємо кнопку "Level 5"
        endButton.style.display = 'none'; // Ховаємо кнопку "End"
        updateHighScores(score); // Оновлюємо таблицю рекордів
        alert('Game over! Your score: ' + score); // Виводимо повідомлення з результатом гри
      }
    }, 1000); // Кожну секунду (1000 мілісекунд) виконуємо цю функцію
  }

  function endGame() {
    if (!isGameRunning) return; // Якщо гра не триває, виходимо з функції

    clearInterval(timerInterval); // Зупиняємо таймер
    isGameRunning = false; // Позначаємо, що гра завершилась
    startButton.style.display = 'block'; // Показуємо кнопку "Start"
    level5Button.style.display = 'inline'; // Показуємо кнопку "Level 5"
    endButton.style.display = 'none'; // Ховаємо кнопку "End"
    updateHighScores(score); // Оновлюємо таблицю рекордів
    alert('Game over! Your score: ' + score); // Виводимо повідомлення з результатом гри
  }

  function updateHighScores(newScore) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(newScore); // Додаємо новий рахунок до списку рекордів
    highScores.sort((a, b) => b - a); // Сортуємо рекорди у спадаючому порядку
    highScores.splice(10); // Обмежуємо кількість рекордів до 10

    localStorage.setItem('highScores', JSON.stringify(highScores)); // Зберігаємо рекорди у локальному сховищі

    highScoresList5.innerHTML = highScores
      .map((score, index) => `<li>${score}</li>`)
      .join(''); // Оновлюємо відображення рекордів у таблиці
  }

  canvas.addEventListener('click', handleClick);

  function gameLoop() {
    update(); // Оновлюємо стан гри
    draw(); // Відображаємо елементи гри на canvas
    requestAnimationFrame(gameLoop); // Запускаємо цикл гри знову
  }

  startButton.addEventListener('click', startGame); // Встановлюємо обробник події для кнопки "Start"
  endButton.addEventListener('click', endGame); // Встановлюємо обробник події для кнопки "End"

  gameLoop(); // Запускаємо цикл гри
}

const level5Button = document.getElementById('level5Button');
level5Button.addEventListener('click', GameLevel5); // Встановлюємо обробник події для кнопки "Level 5"
