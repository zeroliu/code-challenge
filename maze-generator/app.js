import Cell from './cell';


new p5((s) => {
  const CELL_COUNT = 20;
  let canvasWidth, canvasHeight, size, cells, stack, current;

  const removeWalls = (cellA, cellB) => {
    if (cellA.x - cellB.x !== 0) {
      if (cellA.x > cellB.x) {
        cellA.removeWall(Cell.Direction.LEFT);
        cellB.removeWall(Cell.Direction.RIGHT);
      } else {
        cellA.removeWall(Cell.Direction.RIGHT);
        cellB.removeWall(Cell.Direction.LEFT);
      }
    } else {
      if (cellA.y > cellB.y) {
        cellA.removeWall(Cell.Direction.TOP);
        cellB.removeWall(Cell.Direction.BOTTOM);
      } else {
        cellA.removeWall(Cell.Direction.BOTTOM);
        cellB.removeWall(Cell.Direction.TOP);
      }
    }
  };

  const setup = () => {
    s.frameRate(10);
    canvasWidth = s.floor(s.windowWidth * 0.95);
    canvasWidth -= canvasWidth % 10;
    canvasHeight = canvasWidth;
    s.createCanvas(canvasWidth, canvasHeight);
    size = canvasWidth / CELL_COUNT;
    cells = [];
    for (let x = 0; x < CELL_COUNT; x++) {
      cells.push([]);
      for (let y = 0; y < CELL_COUNT; y++) {
        let cell = new Cell(s, x, y, size);
        cells[x].push(cell);
      }
    }
    stack = [];
    current = cells[0][0];
    current.visited = true;
  };

  const draw = () => {
    if (s.touches.length > 0) {
      s.frameRate(s.map(s.touches[0].x, 0, canvasWidth, 5, 60));
    }
    let next = current.getUnvisitedNeighbor(cells);
    if (next) {
      removeWalls(current, next);
      next.visited = true;
      stack.push(current);
      current = next;
    } else {
      current = stack.pop();
      if (!current) {
        s.noLoop();
        return;
      }
    }
    s.background(0);
    cells.forEach((cellCol) => cellCol.forEach((cell) => cell.draw()));
    // Draw current tile.
    s.noStroke();
    s.fill(255);
    s.rect(current.x * size, current.y * size, size, size);
  };

  s.setup = setup;
  s.draw = draw;
}, document.getElementById('container'));
