const pantallaInicio = document.querySelector("#pantalla-inicio")
const pantallaBatalla = document.querySelector("#batalla")

const player1Button = document.getElementById("player1Start")
const player2Button = document.getElementById("player2Start")

let spike = null
let vicious = null

let player1Ready = false
let player2Ready = false


function preparadosListos () {
  if (player1Ready && player2Ready) {
    pantallaInicio.style.display = "none"
    pantallaBatalla.style.display = "flex"
    
  
    spike = new SpikeSpiegel()
    vicious = new viciousRed()
    
   
    movimiento()
  }
}

let imagen1 = document.getElementById("imgp1")
let imagen2 = document.getElementById("imgp2")

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


function movimiento() {
  document.addEventListener("keydown", (event) => {
 
    if (event.key === "a") {
      spike.x -= 5;  
    } else if (event.key === "d") {
      spike.x += 5;  
    } else if (event.key === "w" && !spike.isJumping) {
      spike.isJumping = true
      spike.jump()
    }

    if (event.key === "j") {
      vicious.x -= 5
    } else if (event.key === "l") {
      vicious.x += 5
    } else if (event.key === "i" && !vicious.isJumping) {
      vicious.isJumping = true
      vicious.jump()
    }

  
    spike.node.style.left = `${spike.x}px`
    vicious.node.style.left = `${vicious.x}px`
  });


  setInterval(() => {

    if (spike.isJumping) {
      spike.y += spike.gravitySpeed
      if (spike.y + spike.h >= pantallaBatalla.offsetHeight) {
        spike.y = pantallaBatalla.offsetHeight - spike.h
        spike.isJumping = false
      }
      spike.node.style.top = `${spike.y}px`
    }

    if (vicious.isJumping) {
      vicious.y += vicious.gravitySpeed
      if (vicious.y + vicious.h >= pantallaBatalla.offsetHeight) {
        vicious.y = pantallaBatalla.offsetHeight - vicious.h
        vicious.isJumping = false
      }
      vicious.node.style.top = `${vicious.y}px`
    }
  }, 20)
}


