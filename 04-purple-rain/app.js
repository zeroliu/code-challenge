const Drop = require('./drop');

new p5((s) => {
  let canvasWidth, canvasHeight;
  const DROP_NUM = 300;
  const drops = [];

  const setup = () => {
    canvasWidth = s.displayWidth * 0.95;
    canvasHeight = canvasWidth;
    s.createCanvas(canvasWidth, canvasHeight);
    for (let i = 0; i< DROP_NUM; i++) {
      drops.push(new Drop(canvasWidth, canvasHeight, s));
    }
  };

  const draw = () => {
    s.background(230, 230, 250);
    for (let drop of drops) {
      drop.update();
      drop.draw();
    }
  };

  s.setup = setup;
  s.draw = draw;
}, document.getElementById('container'));
