const STAR_SPEED = 10;
const STAR_RADIUS = 8;

class Star {
  constructor(width, height, sketch) {
    this.width = width;
    this.height = height;
    this.s = sketch;
    this.x = this.s.random(-this.width/2, this.width/2);
    this.y = this.s.random(-this.height/2, this.height/2);
    this.z = this.s.random(0, this.width);
    this.speed = STAR_SPEED / 2;
  }

  update() {
    if (this.s.touches.length > 0) {
      this.speed = this.s.map(
        this.s.touches[0].x, 0, this.width, 5, STAR_SPEED
      );
    }
    this.z -= this.speed;
    if (this.z < 1) {
      this.x = this.s.random(-this.width/2, this.width/2);
      this.y = this.s.random(-this.height/2, this.height/2);
      this.z = this.width;
    }
  }

  render() {
    const x = this.s.map(this.x / this.z, 0, 1, 0, this.width);
    const y = this.s.map(this.y / this.z, 0, 1, 0, this.height);
    const r = STAR_RADIUS * (1 - this.z / this.width);
    this.s.ellipse(x, y, r, r);
  }
}

module.exports = Star;
