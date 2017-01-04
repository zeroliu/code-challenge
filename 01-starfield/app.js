const Star = require('./star');

const STAR_NUM = 500;

new p5((s) => {
  let canvasWidth, canvasHeight;
  const stars = [];
  const setup = () => {
    canvasWidth = s.displayWidth * 0.95;
    canvasHeight = canvasWidth;
    s.createCanvas(canvasWidth, canvasHeight);
    s.background(0);
    s.noStroke();
    for (let i = 0; i < STAR_NUM; i++) {
      stars.push(new Star(canvasWidth, canvasHeight, s));
    }
  };

  const draw = () => {
    s.background(0);
    s.translate(canvasWidth/2, canvasHeight/2);
    for (let star of stars) {
      star.update();
      star.render();
    }
  };

  s.setup = setup;
  s.draw = draw;
}, document.getElementById('container'));
