new p5((s) => {
  let canvasWidth, canvasHeight;
  const setup = () => {
    canvasWidth = s.windowWidth * 0.95;
    canvasHeight = canvasWidth;
    s.createCanvas(canvasWidth, canvasHeight);
  };

  const draw = () => {
    s.ellipse(50, 50, 80, 80);
  };

  s.setup = setup;
  s.draw = draw;
}, document.getElementById('container'));
