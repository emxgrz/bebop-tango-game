const pantallaInicio = document.querySelector("#pantalla-inicio");
const pantallaBatalla = document.querySelector("#batalla")

const player1Button = document.getElementById("player1Start");
const player2Button = document.getElementById("player2Start");




let player1Ready = false;
let player2Ready = false;


function checkPlayersReady() {
  if (player1Ready && player2Ready) {
    pantallaInicio.style.display = "none"
    pantallaBatalla.style.display = "flex"
  }
}

let imagen1 = document.getElementById("imgp1");
let imagen2 = document.getElementById("imgp2");

player1Button.onclick = function () {
  player1Ready = true;
  imagen1.src = "./images/ready.png";
  checkPlayersReady();
};

player2Button.onclick = function () {
  player2Ready = true;
  imagen2.src = "./images/ready.png";
  checkPlayersReady();
};
