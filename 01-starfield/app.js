const p5 = require('p5');

new p5((s) => {
  const setup = () => {
    s.createCanvas(640, 480);
  };

  const draw = () => {
    s.ellipse(50, 50, 80, 80);
  };

  s.setup = setup;
  s.draw = draw;
}, document.getElementById('container'));
