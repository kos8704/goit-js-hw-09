  const startBtn    = document.querySelector('[data-start]');
  const stopBtn     = document.querySelector('[data-stop]');
  const body        = document.querySelector('body');
  let intervalId    = null;

  startBtn.addEventListener('click', startChangeColor);
  stopBtn.addEventListener('click', stopChangeColor);

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  function startChangeColor() {
    intervalId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtn.disabled = true;
  }

  function stopChangeColor() {
    clearInterval(intervalId);
    startBtn.disabled = false;
  }
