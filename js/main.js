//ELEMENTOS PRINCIPALES DEL DOM

const pantallaInicio = document.querySelector("#pantalla-inicio")
const pantallaBatalla = document.querySelector("#batalla")
const pantallaFinal = document.querySelector("#final")
let plataforma = null

//BOTONES
const player1Button = document.getElementById("player1Start")
const player2Button = document.getElementById("player2Start")
let imagen1 = document.getElementById("imgp1")
let imagen2 = document.getElementById("imgp2")

let restart = document.getElementById("restart")

// VARIABLES
let spike = null
let vicious = null

let player1Ready = false
let player2Ready = false

let gameIntervalId

let bala = []

//FUNCIONES PRINCIPALES
player1Button.onclick = function () {
  player1Ready = true
  imagen1.src = "./images/ready.png"
  preparadosListos()
}

player2Button.onclick = function () {
  player2Ready = true
  imagen2.src = "./images/ready.png"
  preparadosListos()
}

//-----Función para ver si ambos jugadores están listos
function preparadosListos() {
  if (player1Ready && player2Ready) {
    pantallaInicio.style.display = "none"
    pantallaBatalla.style.display = "flex"
    startGame()
  }
}

//-------Aparición de personajes
function startGame() {
  spike = new SpikeSpiegel()
  vicious = new viciousRed()
  plataforma = new barra()

  gameIntervalId = setInterval(gameLoop, Math.round(1000 / 60))

}


//--------gameLoop
function gameLoop() {
  if (spike) {
    spike.moveX()
  }
  if (vicious) {
    vicious.moveX()

  }

  if (spike.isJumping && (spike.y+spike.h) < plataforma.y) {
    spike.gravity()
  }

  if (vicious.isJumping && (vicious.y+vicious.h) < plataforma.y) {
    vicious.gravity()
  }

  bala.forEach((proyectil, index) => {
    proyectil.move()

    if (proyectil.balaPerdida()) {
      proyectil.remove()
      bala.splice(index, 1)
      return
    } 
    
    if (detectarColisionBalaSpike(proyectil)) {
        proyectil.remove()
        bala.splice(index, 1)
        gameOver()
        return
      }
    if (detectarColisionBalaVicious(proyectil)) {
        proyectil.remove()
        bala.splice(index, 1)
        gameOver()
        return
      }
  })

}

//EVENT LISTENERS
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key === "j") {
    //izquierda
    spike.speedX = 5
    spike.directionX = -1

  } else if (key === "l") {
    // derecha
    spike.speedX = 5
    spike.directionX = 1

  } else if (key === "i") {
    // salta
    spike.jump()
  

  } else if (key === "a") {
    vicious.speedX = 5
    vicious.directionX = -1

  } else if (key === "d") {
    vicious.speedX = 5
    vicious.directionX = 1

  } else if (key === "w") {
    vicious.jump()
  }

})

document.addEventListener("keyup", (event) => {
  const key = event.key

  if (key === "j" || key === "l") {
    // parar al personaje si no está presionando derecha o izquierda
    spike.speedX = 0
  } else if (key === "a" || key === "d") {
    vicious.speedX = 0
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key

  if (key === "k") {
    disparar(spike)
  } else if (key === "s") {
    disparar(vicious); 
  }
})



function disparar(player) {
 
    let initialX;
  
    
    if (player.directionX === 1) {
      // jugador mirando hacia la derecha:
      initialX = player.x + player.w // proyectil a la derecha del jugador
    } else if (player.directionX === -1) {
      // jugador está hacia la izquierda
      initialX = player.x - 20  // proyectil a la izquierda del jugador
    } else {
      // Si el jugador no está moviéndose horizontalmente (dirección desconocida)
      initialX = player.x + player.w // Default a la derecha
    }
  
    const proyectil = new Proyectil(initialX, player.y + player.h / 2.7, player.directionX);
    bala.push(proyectil) // actualizado array bala
  
}


// coliciones

function detectarColisionBalaSpike(proyectil) {
  return (
    spike.x < proyectil.x + proyectil.w &&
    spike.x + spike.w > proyectil.x &&
    spike.y < proyectil.y + proyectil.h &&
    spike.y + spike.h > proyectil.y
  ) 
}


function detectarColisionBalaVicious(proyectil) {
  return (
    vicious.x < proyectil.x + proyectil.w &&
    vicious.x + vicious.w > proyectil.x &&
    vicious.y < proyectil.y + proyectil.h &&
    vicious.y + vicious.h > proyectil.y
  ) 
}

// gameover
function gameOver() {
  pantallaBatalla.style.display = "none"
  pantallaFinal.style.display = "flex"

}


// reiniciar el juego

restart.onclick = function () {
  restartGame()
}

function restartGame() {

    if (gameIntervalId) {
      clearInterval(gameIntervalId)
      gameIntervalId = null
    }
  
    // eliminar la pantalla
    while (pantallaBatalla.firstChild) {
      pantallaBatalla.removeChild(pantallaBatalla.firstChild);
    }
  

    spike = null
    vicious = null
    player1Ready = false
    player2Ready = false
    imagen1.src = "./images/playerOne.png"
    imagen2.src = "./images/playerTwo.png"
    bala = []
  
    // pantalla aparece
    pantallaInicio.style.display = 'flex';
    pantallaBatalla.style.display = 'none';
    pantallaFinal.style.display = 'none';
  
    // reiniciar botones
    player1Button.onclick = function () {
      player1Ready = true;
      imagen1.src = "./images/ready.png";
      preparadosListos();
    };
  
    player2Button.onclick = function () {
      player2Ready = true;
      imagen2.src = "./images/ready.png";
      preparadosListos();
    };
  

  }
  
  function startGame() {
    // nuevos personajes y plataforma
    spike = new SpikeSpiegel();
    vicious = new viciousRed();
    plataforma = new barra();
  
   
    gameIntervalId = setInterval(gameLoop, Math.round(1000 / 60));
  
  

}



//EXTRAS;
// --Crear puntuación (entonces no ganaría quien primero dispare al otro, si no a la de tres o algo así)
// --Si spike gameIntervalId, que pase a un final, y si vicious , que pase a otro.
// Pegar patadas (necesitaría movimiento de la pierna)
//Poner música
//botones on and off de música
// diferentes enemigos, el último sería vicious. Cambiar el nombre de la clase y crear extensiones
//
