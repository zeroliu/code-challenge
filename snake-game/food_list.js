const RATIO = 0.001;

class FoodList {
  constructor(canvasWidth, canvasHeight, size, s) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.size = size;
    this.s = s;
    this.locationMap = {};
  }

  tryGenerate() {
    if (Object.keys(this.locationMap).length === 0 || this.s.random(0, 1) < RATIO) {
      this.generate();
    }
  }

  generate() {
    let x = this.s.floor(this.s.random(0, this.canvasWidth));
    x -= x % this.size;
    let y = this.s.floor(this.s.random(0, this.canvasHeight));
    y -= y % this.size;
    this.locationMap[this.parseKey(x, y)] = {x, y};
  }

  parseKey(x, y) {
    return `${x}_${y}`;
  }

  hasFood(x, y) {
    return !!this.locationMap[this.parseKey(x,y)];
  }

  remove(x, y) {
    delete this.locationMap[this.parseKey(x,y)];
  }

  reset() {
    this.locationMap = {};
  }

  draw() {
    for (let key in this.locationMap) {
      let l = this.locationMap[key];
      this.s.ellipse(l.x, l.y, this.size, this.size);
    }
  }
}

module.exports = FoodList;
