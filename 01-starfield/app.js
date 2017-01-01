const p5 = require('p5');

new p5((s) => {
  const starNum = 100;
  const starRad = 5;
  const canvasWidth = 640;
  const canvasHeight = 640;

  const setup = () => {
    s.createCanvas(canvasWidth, canvasHeight);
    s.background(0);
    s.noStroke();
    for (let i = 0; i < starNum; i++) {
      s.ellipse(Math.random() * canvasWidth, Math.random() * canvasHeight, starRad, starRad);
    }
  };

  const draw = () => {
  };

  s.setup = setup;
  s.draw = draw;
}, document.getElementById('container'));
