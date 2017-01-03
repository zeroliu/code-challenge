const SPEED = 1;
const RATIO = 2;
const SIZE = 10;

class Splash {
  constructor(x, y, scale, sketch, destroy) {
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.s = sketch;
    this.destroy = destroy;

    this.size = 0;
  }

  update() {
    this.size += SPEED;
    if (this.size > this.scale * SIZE) {
      this.destroy();
    }
  }

  draw() {
    this.s.noFill();
    this.s.stroke(138, 43, 226);
    this.s.strokeWeight(1);
    this.s.ellipse(this.x, this.y, this.size*RATIO, this.size);
  }
}

module.exports = Splash;
