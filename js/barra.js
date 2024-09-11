class barra {
  constructor() {
    this.x = 200
    this.y = 530
    this.h = 50
    this.w = 1100
    

    this.node = document.createElement("img")
    this.node.src = "./images/Plataforma_.png"
    pantallaBatalla.append(this.node)


    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`
    this.node.style.position = "absolute"
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`
  }

  remove() {
    this.node.remove()
  }
}

