class viciousRed {
  constructor() {
    this.x = 380
    this.y = 200
    this.h = 350
    this.w = 250;
    this.gravitySpeed = 1.5
    this.jumpSpeed = 25
    this.speedX = 0
    this.directionX = 0


    this.node = document.createElement("img")
    this.node.src = "./images/vicius-buena.png" 
    pantallaBatalla.append(this.node)


    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`
    this.node.style.position = "absolute"
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`

  

    this.isJumping = false
  }


  moveX() {
    this.x += this.speedX * this.directionX
    this.node.style.left = `${this.x}px`
  }


    jump() {
      this.y -= this.jumpSpeed
      this.node.style.top = `${this.y}px`
    }

}

