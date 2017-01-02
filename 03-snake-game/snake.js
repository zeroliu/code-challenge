const SPEED = 5; // 0 - 10;
const MAX_SPEED = 10;
const INIT_BODY = 4;

class Snake {
  constructor(canvasWidth, canvasHeight, size, s) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.size = size;
    this.s = s;
    this.x = s.floor(s.random(0, canvasWidth));
    this.x -= this.x % size;
    this.y = s.floor(s.random(0, canvasHeight));
    this.y -= this.y % size;
    this.bodies = [];
    this.dx = 1;
    this.dy = 0;
    this.growPoint = INIT_BODY;
    this.countdown = MAX_SPEED - SPEED;
  }

  move() {
    this.countdown--;
    if (this.countdown > 0) {
      return;
    }
    this.countdown = MAX_SPEED - SPEED;

    let x = this.x + this.dx * this.size;
    let y = this.y + this.dy * this.size;
    this.bodies.unshift({x: this.x, y: this.y});
    this.x = x;
    this.y = y;
    if (this.growPoint > 0) {
      this.growPoint --;
    } else {
      this.bodies.pop();
    }
  }

  grow() {
    this.growPoint++;
  }

  turn(dx, dy) {
    // dx XOR dy
    if (dx && !dy || !dx && dy) {
      if (dx && !this.dx) {
        this.dx = dx;
        this.dy = 0;
      } else if (dy && !this.dy) {
        this.dx = 0;
        this.dy = dy;
      }
    }
  }

  didHit() {
    if (this.x >= this.canvasWidth ||
        this.x < 0 ||
        this.y >= this.canvasHeight ||
        this.y < 0) {
      return true;
    }
    for (let body of this.bodies) {
      if (body.x === this.x && body.y === this.y) {
        return true;
      }
    }

    return false;
  }

  reset() {
    this.x = this.s.floor(this.s.random(0, this.canvasWidth));
    this.x -= this.x % this.size;
    this.y = this.s.floor(this.s.random(0, this.canvasHeight));
    this.y -= this.y % this.size;
    this.bodies = [];
    this.dx = 1;
    this.dy = 0;
    this.growPoint = INIT_BODY;
    this.countdown = MAX_SPEED - SPEED;
  }

  draw() {
    this.s.fill('red');
    this.s.rect(this.x, this.y, this.size, this.size);
    this.s.fill(255);
    for (let body of this.bodies) {
      this.s.rect(body.x, body.y, this.size, this.size);
    }
  }
}

module.exports = Snake;
