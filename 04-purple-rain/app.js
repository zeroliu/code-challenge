const p5 = require('p5');
const Drop = require('./drop');

new p5((s) => {
  const WIDTH = 640;
  const HEIGHT = 480;
  const DROP_NUM = 500;
  const drops = [];

  const setup = () => {
    s.createCanvas(WIDTH, HEIGHT);
    for (let i = 0; i< DROP_NUM; i++) {
      drops.push(new Drop(WIDTH, HEIGHT, s));
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
