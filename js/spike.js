class SpikeSpiegel {
  constructor() {
    this.x = 800;
    this.y = 290;
    this.h = 250;
    this.w = 150;
    this.gravitySpeed = 4.5
    this.jumpSpeed = 150
    this.speedX = 0
    this.directionX = 0 //uno o -1, derecha izq
    this.velocityY = 0

    console.log("spike aparece")
    this.node = document.createElement("img")
    this.node.src = "./images/spike-buena.png"
    pantallaBatalla.append(this.node)


    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`
    this.node.style.position = "absolute"
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`

    this.isJumping = false
  }

    moveX() {
      this.x += this.speedX*this.directionX
      this.node.style.left = `${this.x}px`
    }

    gravity() {
      this.y +=this.gravitySpeed
      this.node.style.top = `${this.y}px`
    }

    jump() {
      this.y -= this.jumpSpeed
      this.node.style.top = `${this.y}px`
      this.isJumping=true
    }

    remove() {
      this.node.remove()
    }



}

