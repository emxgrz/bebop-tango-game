class proyectil {
  constructor(x,y) {
    this.x = x
    this.y = y

    this.node = document.createElement("img")
    this.node.src = "./images/bala"
    pantallaBatalla.append(this.node)
  }
}


//const proyectil1 = new proyectil(spike.x)

