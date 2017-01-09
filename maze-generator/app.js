import Cell from './cell';


new p5((s) => {
  const CELL_COUNT = 20;
  let canvasWidth, canvasHeight, cells, stack, current;

  const removeWalls = (cellA, cellB) {
    if (cellA.x - cellB.x !== 0) {
      if (cellA.x > cellB.x) {
      }

    } else {
    }
  };

  const setup = () => {
    canvasWidth = s.floor(s.displayWidth * 0.95);
    canvasWidth -= canvasWidth % 10;
    canvasHeight = canvasWidth;
    s.createCanvas(canvasWidth, canvasHeight);
    let size = canvasWidth / CELL_COUNT;
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
    let next = current.getUnvisitedNeighbor(cells);
    if (next) {
      if (current.x - next.x != 0)
      next.visited = true;
      current = next;
    }
    s.background(0);
    cells.forEach((cellCol) => cellCol.forEach((cell) => cell.draw()));
  };

  s.setup = setup;
  s.draw = draw;
}, document.getElementById('container'));
