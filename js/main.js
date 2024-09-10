//ELEMENTOS PRINCIPALES DEL DOM

const pantallaInicio = document.querySelector("#pantalla-inicio")
const pantallaBatalla = document.querySelector("#batalla")
const pantallaFinal = document.querySelector("#final")




//BOTONES
const player1Button = document.getElementById("player1Start")
const player2Button = document.getElementById("player2Start")
let imagen1 = document.getElementById("imgp1")
let imagen2 = document.getElementById("imgp2")


// VARIABLES
let spike = null
let vicious = null

let player1Ready = false
let player2Ready = false

let gameIntervalId



//FUNCIONES PRINCIPALES
player1Button.onclick = function () {
  player1Ready = true
  imagen1.src = "./images/ready.png"
  preparadosListos()
};

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
function startGame () {
  spike = new SpikeSpiegel()
  vicious = new viciousRed()

  gameIntervalId = setInterval(gameLoop, Math.round(1000 / 60))

}



//---------Intervalos y loop


function gameLoop() {
 
  if (spike) {
    spike.moveX();
  }
  if (vicious) {
    vicious.moveX();
  }

  
}


//EVENT LISTENERS
document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (key === 'a') { //izquierda
    spike.speedX = 5;
    spike.directionX = -1;
  } 
  else if (key === 'd') { // derecha
    spike.speedX = 5;
    spike.directionX = 1;
  } 
  else if (key === 'w') { // salta
    spike.jump();
  } 
  else if (key === 'j') { 
    vicious.speedX = 5;
    vicious.directionX = -1;
  } 
  else if (key === 'l') { 
    vicious.speedX = 5;
    vicious.directionX = 1;
  } 
  else if (key === 'i') { 
    vicious.jump();
  }
});

document.addEventListener('keyup', (event) => {
  const key = event.key;

  if (key === 'a' || key === 'd') { // parar al personaje si no está presionando derecha o izquierda
    spike.speedX = 0;
  } 
  else if (key === 'j' || key === 'l') { 
    vicious.speedX = 0;
  }
});




//crear detección de colisión


// crear fución que pase al gameover


//AÑADIR PLATAFORMA PARA LUCHA







//EXTRAS;
// --Crear puntuación (entonces no ganaría quien primero dispare al otro, si no a la de tres o algo así)
// --Si spike gameIntervalId, que pase a un final, y si vicious , que pase a otro.
// Pegar patadas (necesitaría movimiento de la pierna)
//Poner música
//botones on and off de música
// diferentes enemigos, el último sería vicious. Cambiar el nombre de la clase y crear extensiones
//
