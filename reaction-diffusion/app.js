new p5((s) => {
  let canvasWidth, canvasHeight, grids, next;
  const DA = 1.0;
  const DB = 0.5;
  const FEED = 0.0545;
  const KILL = 0.062;

  const setup = () => {
    //canvasWidth = s.displayWidth * 0.95;
    //canvasWidth -= canvasWidth % 10;
    //canvasHeight = canvasWidth;
    canvasWidth = 200;
    canvasHeight = 200;

    s.createCanvas(canvasWidth, canvasHeight);
    grids = [];
    next = [];
    for (let x = 0; x < canvasWidth; x++) {
      grids[x] = [];
      next[x] = [];
      for (let y = 0; y < canvasHeight; y++) {
        grids[x][y] = {a: 1, b: 0};
        next[x][y] = {a: 1, b: 0};
      }
    }
    let seedX = s.floor(canvasWidth / 2);
    let seedY = s.floor(canvasHeight / 2);
    for (let x = seedX - 10; x < seedX + 10; x++) {
      for (let y = seedY - 10; y < seedY + 10; y++) {
        grids[x][y].b = 1;
      }
    }
  };

  const calculateNext = () => {
    for (let x = 1; x < canvasWidth - 1; x++) {
      for (let y = 1; y < canvasHeight - 1; y++) {
        let a = grids[x][y].a;
        let b = grids[x][y].b;
        next[x][y].a = a + DA * laplacian('a', x, y) - a * b * b + FEED * (1 - a);
        next[x][y].b = b + DB * laplacian('b', x, y) + a * b * b - (KILL + FEED) * b;
        next[x][y].a = s.constrain(next[x][y].a, 0, 1);
        next[x][y].b = s.constrain(next[x][y].b, 0, 1);
      }
    }
  }

  const laplacian = (id, x, y) => {
    let sum = 0;
    sum -= grids[x][y][id];
    sum += grids[x-1][y][id] * 0.2;
    sum += grids[x+1][y][id] * 0.2;
    sum += grids[x][y-1][id] * 0.2;
    sum += grids[x][y+1][id] * 0.2;
    sum += grids[x-1][y-1][id] * 0.05;
    sum += grids[x-1][y+1][id] * 0.05;
    sum += grids[x+1][y-1][id] * 0.05;
    sum += grids[x+1][y+1][id] * 0.05;
    return sum;
  }

  const draw = () => {
    calculateNext();
    s.loadPixels();
    for (let x = 0; x < canvasWidth; x++) {
      for (let y = 0; y < canvasHeight; y++) {
        let d = s.pixelDensity();
        let diff = s.floor((next[x][y].a - next[x][y].b) * 255);
        let color = s.constrain(diff, 0, 255);
        for (let i = 0; i < d; i++) {
          for (let j = 0; j < d; j++) {
            let pix = ((x * d + i) + (y * d + j) * canvasWidth * d) * 4;
            s.pixels[pix] = color;
            s.pixels[pix + 1] = color;
            s.pixels[pix + 2] = color;
            s.pixels[pix + 3] = 255;
          }
        }
      }
    }
    s.updatePixels();
    grids = next;
  };

  s.setup = setup;
  s.draw = draw;
}, document.getElementById('container'));
