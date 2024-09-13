class Proyectil {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 10;
    this.speed = 10;
    this.direction = direction;
    this.node = document.createElement("img");
    this.node.src = "./images/bala.png";
    pantallaBatalla.append(this.node);

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  move() {
    this.x += this.speed * this.direction;
    this.node.style.left = `${this.x}px`;
  }

  balaPerdida() {
    return this.x < 0 || this.x > window.innerWidth;
  }

  remove() {
    this.node.remove();
  }
}
