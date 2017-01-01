const p5 = require('p5');
const Star = require('./star');

const STAR_NUM = 100;
const WIDTH = 640;
const HEIGHT = 640;

new p5((s) => {
  const stars = [];
  const setup = () => {
    s.createCanvas(WIDTH, HEIGHT);
    s.background(0);
    s.noStroke();
    for (let i = 0; i < STAR_NUM; i++) {
      stars.push(new Star(WIDTH, HEIGHT, s));
    }
  };

  const draw = () => {
    s.background(0);
    s.translate(WIDTH/2, HEIGHT/2);
    for (let star of stars) {
      star.update();
      star.render();
    }
  };

  s.setup = setup;
  s.draw = draw;
}, document.getElementById('container'));
