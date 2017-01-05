const Splash = require('./splash');
// size, stroke weight and speed apply to drop when z = 0
const SIZE = 30;
const STROKE_WEIGHT = 4;
const SPEED = 10;
const MAX_Z = 100;
const GRAVITY = 0.2;

class Drop {
  constructor(canvasWidth, canvasHeight, sketch) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.s = sketch;

    this.x = this.s.random(0, this.canvasWidth);
    this.y = this.s.random(-this.canvasHeight/2, this.canvasHeight);
    this.z = this.s.random(0, MAX_Z);
    this.calculate();
  }

  calculate() {
    this.size = this.s.map(this.z, 0, MAX_Z, SIZE, 0.1);
    this.speed = this.s.map(this.z, 0, MAX_Z, SPEED, SPEED/2);
    this.acc = this.s.map(this.z, 0, MAX_Z, GRAVITY, GRAVITY/2);
    this.dest = this.s.map(
      this.z, 0, MAX_Z, this.canvasHeight-SIZE, this.canvasHeight - MAX_Z);
  }

  createSplash(x, y) {
    this.splash = new Splash(
      x,
      y,
      this.s.map(this.z, 0, MAX_Z, 1, 0.1),
      this.s,
      this.removeSplash.bind(this)
    );
  }

  removeSplash() {
    this.splash = null;
  }

  update() {
    this.speed += this.acc;
    this.y += this.speed;
    if (this.y + this.size > this.dest) {
      this.createSplash(this.x, this.y + this.size);
      this.x = this.s.random(0, this.canvasWidth);
      this.y = this.s.random(-this.canvasHeight * 2, -SIZE);
      this.z = this.s.random(0, MAX_Z);
      this.calculate();
    }
    this.splash && this.splash.update();
  }

  draw() {
    this.s.stroke(138, 43, 226);
    this.s.strokeWeight(this.s.map(this.z, 0, MAX_Z, STROKE_WEIGHT, 0.1));
    this.s.line(this.x, this.y, this.x, this.y + SIZE);
    this.splash && this.splash.draw();
  }
}

module.exports = Drop;
