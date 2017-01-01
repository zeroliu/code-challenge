const STAR_SPEED = 10;
const STAR_RADIUS = 8;

class Star {
  constructor(width, height, sketch) {
    this.width = width;
    this.height = height;
    this.depth = Math.max(this.width, this.height);
    this.sketch = sketch;
    this.x = (Math.random() - 0.5) * this.width;
    this.y = (Math.random() - 0.5) * this.height;
    this.z = Math.random() * this.depth;
  }

  update() {
    const speed = STAR_SPEED * this.sketch.mouseX / this.width + 5;
    this.z -= speed;
    if (this.z < 1) {
      this.x = (Math.random() - 0.5) * this.width;
      this.y = (Math.random() - 0.5) * this.height;
      this.z = this.depth;
    }
  }

  render() {
    const x = this.x / this.z * this.width / 2;
    const y = this.y / this.z * this.height / 2;
    const r = STAR_RADIUS * (1 - this.z / this.depth);
    this.sketch.ellipse(x, y, r, r);
  }
}

module.exports = Star;
