const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const jumpCounter = document.getElementById("jumpCounter");

let jumps = 0;

const jump = () => {
  if (window.isGameOver) return;
  mario.classList.add("jump");
  jumps += 1;
  if (jumpCounter) jumpCounter.textContent = `Saltos: ${jumps}`;

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "./imgs/game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "50px";

    clearInterval(loop);

    // Marca game over globalmente
    window.isGameOver = true;

    // Exibe mensagem de Game Over e botão de reiniciar
    const gameOverMsg = document.getElementById("gameOverMsg");
    const restartBtn = document.getElementById("restartBtn");
    const gameOverScore = document.getElementById("gameOverScore");
    mario.style.filter = "grayscale(100%) brightness(1.5)";
    
    if (gameOverScore) gameOverScore.textContent = `Seu score: ${jumps}`;
    gameOverMsg.style.display = "block";
    restartBtn.onclick = () => {
      window.location.reload();
    };
  }
}, 10);

document.addEventListener("keydown", jump);
