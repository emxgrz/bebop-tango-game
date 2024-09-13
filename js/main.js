const pantallaInicio = document.querySelector("#pantalla-inicio");
const pantallaBatalla = document.querySelector("#batalla");
const pantallaFinal = document.querySelector("#final");

const spikeLifeBarNode = document.querySelector("#spikeLifeBar");
const viciousLifeBarNode = document.querySelector("#viciousLifeBar");
const lifeBarContainerVicious = document.querySelector(
  "#viciousLifeBarContainer"
);
const lifeBarContainerSpike = document.querySelector("#spikeLifeBarCont");

let plataforma = null;

const logo = document.querySelector("#logo");

//AUDIO
const cancionInicio = document.querySelector("#chickenBone");
const cancionBatalla = document.querySelector("#tank");
const cancionFinal = document.querySelector("#theRealFolk");
const disparo = new Audio("./images/audio/bala.mp3");
const sonidoBoton = new Audio("./images/audio/button-sound.mp3");

cancionInicio.volume = 0.1;
cancionBatalla.volume = 0.1;
cancionFinal.volume = 0.1;
disparo.volume = 0.03;
sonidoBoton.volume = 0.1;

//BOTONES
const player1Button = document.getElementById("player1Start");
const player2Button = document.getElementById("player2Start");
let imagen1 = document.getElementById("imgp1");
let imagen2 = document.getElementById("imgp2");

let restart = document.getElementById("restart");

// VARIABLES
let spike = null;
let vicious = null;

let player1Ready = false;
let player2Ready = false;

let gameIntervalId;

let bala = [];

//BONUS VIDA
let maxHealth = 100;
let spikeHealth = maxHealth;
let viciousHealth = maxHealth;

logo.onclick = function () {
  cancionInicio.play();
};

//FUNCIONES PRINCIPALES
player1Button.onclick = function () {
  sonidoBoton.play();
  player1Ready = true;
  imagen1.src = "./images/ready.png";
  preparadosListos();
};

player2Button.onclick = function () {
  sonidoBoton.play();
  player2Ready = true;
  imagen2.src = "./images/ready.png";
  preparadosListos();
};

//-----Función para ver si ambos jugadores están listos
function preparadosListos() {
  if (player1Ready && player2Ready) {
    pantallaInicio.style.display = "none";
    pantallaBatalla.style.display = "flex";
    cancionInicio.pause();
    cancionInicio.currentTime = 0;
    cancionBatalla.play();
    startGame();
  }
}

//-------Aparición de personajes
function startGame() {
  spike = new SpikeSpiegel();
  vicious = new viciousRed();
  plataforma = new barra();

  gameIntervalId = setInterval(gameLoop, Math.round(1000 / 60));
}

//--------gameLoop
function gameLoop() {
  if (spike) {
    spike.moveX();
  }
  if (vicious) {
    vicious.moveX();
  }

  if (spike.isJumping && spike.y + spike.h < plataforma.y) {
    spike.gravity();
  }

  if (
    spike.x > plataforma.x + plataforma.w ||
    spike.x + spike.w < plataforma.x
  ) {
    gameOver(); // Spike cae, game over
  }

  if (vicious.isJumping && vicious.y + vicious.h < plataforma.y) {
    vicious.gravity();
  }

  if (
    vicious.x > plataforma.x + plataforma.w ||
    vicious.x + vicious.w < plataforma.x
  ) {
    gameOver(); // Vicious cae fuera de la plataforma
  }

  bala.forEach((proyectil, index) => {
    proyectil.move();

    if (proyectil.balaPerdida()) {
      proyectil.remove();
      bala.splice(index, 1);
      return;
    }

    if (detectarColisionBalaSpike(proyectil)) {
      proyectil.remove();
      bala.splice(index, 1);
      // gameOver()
      return;
    }
    if (detectarColisionBalaVicious(proyectil)) {
      proyectil.remove();
      bala.splice(index, 1);
      // gameOver()
      return;
    }
  });
}

//EVENT LISTENERS
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key === "j") {
    //izquierda
    spike.speedX = 5;
    spike.directionX = -1;
  } else if (key === "l") {
    // derecha
    spike.speedX = 5;
    spike.directionX = 1;
  } else if (key === "i") {
    // salta
    spike.jump();
  } else if (key === "a") {
    vicious.speedX = 5;
    vicious.directionX = -1;
  } else if (key === "d") {
    vicious.speedX = 5;
    vicious.directionX = 1;
  } else if (key === "w") {
    vicious.jump();
  }
});

document.addEventListener("keyup", (event) => {
  const key = event.key;

  if (key === "j" || key === "l") {
    // parar al personaje si no está presionando derecha o izquierda
    spike.speedX = 0;
  } else if (key === "a" || key === "d") {
    vicious.speedX = 0;
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key === "k") {
    disparar(spike);
  } else if (key === "s") {
    disparar(vicious);
  }
});

function disparar(player) {
  let initialX;

  if (player.directionX === 1) {
    // jugador mirando hacia la derecha:
    initialX = player.x + player.w; // proyectil a la derecha del jugador
  } else if (player.directionX === -1) {
    // jugador está hacia la izquierda
    initialX = player.x - 20; // proyectil a la izquierda del jugador
  } else {
    // Si el jugador no está moviéndose horizontalmente (dirección desconocida)
    initialX = player.x + player.w; // Default a la derecha
  }

  const proyectil = new Proyectil(
    initialX,
    player.y + player.h / 2.7,
    player.directionX
  );
  bala.push(proyectil); // actualizado array bala
  disparo.play();

  if (player instanceof SpikeSpiegel) {
    player.changeImage("./images/spike-shooting.png");

    setTimeout(() => {
      player.changeImage("./images/spike-buena.png");
    }, 350);
  } else if (player instanceof viciousRed) {
    player.changeImage("./images/vicious-side.png");

    setTimeout(() => {
      player.changeImage("./images/vicius-buena.png");
    }, 350);
  }
}

// FUNCIÓN BONUS --- restar vida
function updateSpikeLifeBar() {
  let lifePercentage = (spikeHealth / maxHealth) * 100;
  spikeLifeBarNode.style.width = `${lifePercentage}%`;
}

function updateViciousLifeBar() {
  let lifePercentage = (viciousHealth / maxHealth) * 100;
  viciousLifeBarNode.style.width = `${lifePercentage}%`;
}

// Restar daño, cambiar imagen si mueren

function spikeTakesDamage(damage) {
  spikeHealth -= damage;
  if (spikeHealth < 0) spikeHealth = 0;
  updateSpikeLifeBar();

  if (spikeHealth === 0) {
    spike.changeImage("./images/spike-dead.png");

    setTimeout(() => {
      gameOver();
    }, 2000);
  }
}

function viciousTakesDamage(damage) {
  viciousHealth -= damage;
  if (viciousHealth < 0) viciousHealth = 0;
  updateViciousLifeBar();

  if (viciousHealth === 0) {
    vicious.changeImage("./images/vicius-dead.png");

    setTimeout(() => {
      gameOver();
    }, 2000);
  }
}

// colisiones

function detectarColisionBalaSpike(proyectil) {
  if (
    spike.x < proyectil.x + proyectil.w &&
    spike.x + spike.w > proyectil.x &&
    spike.y < proyectil.y + proyectil.h &&
    spike.y + spike.h > proyectil.y
  ) {
    spikeTakesDamage(10);
    return true;
  }
  return false;
}

function detectarColisionBalaVicious(proyectil) {
  if (
    vicious.x < proyectil.x + proyectil.w &&
    vicious.x + vicious.w > proyectil.x &&
    vicious.y < proyectil.y + proyectil.h &&
    vicious.y + vicious.h > proyectil.y
  ) {
    viciousTakesDamage(10);
    return true;
  }
  return false;
}

// gameover
function gameOver() {
  pantallaBatalla.style.display = "none";
  pantallaFinal.style.display = "flex";
  cancionBatalla.pause();
  cancionBatalla.currentTime = 0;
  cancionFinal.play();
}

// reiniciar el juego

restart.onclick = function () {
  sonidoBoton.play();
  restartGame();
};

function restartGame() {
  if (gameIntervalId) {
    clearInterval(gameIntervalId);
    gameIntervalId = null;
  }

  // eliminar la pantalla
  while (pantallaBatalla.firstChild) {
    pantallaBatalla.removeChild(pantallaBatalla.firstChild);
  }

  cancionFinal.pause();
  cancionFinal.currentTime = 0;
  cancionInicio.play();
  spike = null;
  vicious = null;
  player1Ready = false;
  player2Ready = false;
  imagen1.src = "./images/playerOne.png";
  imagen2.src = "./images/playerTwo.png";
  bala = [];

  spikeHealth = maxHealth;
  viciousHealth = maxHealth;

  lifeBarContainerSpike.appendChild(spikeLifeBarNode);
  lifeBarContainerVicious.appendChild(viciousLifeBarNode);

  pantallaBatalla.appendChild(lifeBarContainerSpike);
  pantallaBatalla.appendChild(lifeBarContainerVicious);

  updateSpikeLifeBar();
  updateViciousLifeBar();

  // pantalla aparece
  pantallaInicio.style.display = "flex";
  pantallaBatalla.style.display = "none";
  pantallaFinal.style.display = "none";

  // reiniciar botones
  player1Button.onclick = function () {
    sonidoBoton.play();
    player1Ready = true;
    imagen1.src = "./images/ready.png";
    preparadosListos();
  };

  player2Button.onclick = function () {
    sonidoBoton.play();
    player2Ready = true;
    imagen2.src = "./images/ready.png";
    preparadosListos();
  };
}
