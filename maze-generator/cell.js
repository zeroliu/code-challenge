class Cell {
  constructor(sketch, x, y, size) {
    this.s = sketch;
    this.x = x;
    this.y = y;
    this.size = size;
    this.wall = (1 << 4) - 1; // 1111 in order of up/right/down/left
    this.visited = false;
  }

  removeWall(direction) {
    this.wall &= ~(1 << direction);
  }

  getUnvisitedNeighbor(cells) {
    const neighbors = [];
    if (this.y > 0) {
      let top = cells[this.x][this.y - 1];
      !top.visited && neighbors.push(top);
    }
    if (this.x < cells.length - 1) {
      let right = cells[this.x + 1][this.y];
      !right.visited && neighbors.push(right);
    }
    if (this.y < cells[this.x].length - 1) {
      let bottom = cells[this.x][this.y + 1];
      !bottom.visited && neighbors.push(bottom);
    }
    if (this.x > 0) {
      let left = cells[this.x - 1][this.y];
      !left.visited && neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let index = this.s.floor(this.s.random(0, neighbors.length));
      return neighbors[index];
    }

    return null;
  }

  draw() {
    this.s.stroke(0, 155, 45);
    const sx = this.x * this.size;
    const sy = this.y * this.size;
    if (this.wall & 1 << Cell.Direction.TOP) {
      this.s.line(sx, sy, sx + this.size, sy);
    }
    if (this.wall & 1 << Cell.Direction.RIGHT) {
      this.s.line(sx + this.size, sy,
                  sx + this.size, sy + this.size);
    }
    if (this.wall & 1 << Cell.Direction.BOTTOM) {
      this.s.line(sx, sy + this.size,
                  sx + this.size, sy + this.size);
    }
    if (this.wall & 1 << Cell.Direction.LEFT) {
      this.s.line(sx, sy,
                  sx, sy + this.size);
    }

    if (this.visited) {
      this.s.noStroke();
      this.s.fill(237, 178, 0, 100);
      this.s.rect(sx, sy, this.size, this.size);
    }
  }
}

Cell.Direction = {
  TOP: 0,
  RIGHT: 1,
  BOTTOM: 2,
  LEFT: 3
};

export default Cell;
