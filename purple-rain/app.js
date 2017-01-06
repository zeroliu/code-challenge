const Drop = require('./drop');

new p5((s) => {
  let canvasWidth, canvasHeight;
  const MAX_DROP_NUM = 300;
  const MIN_DROP_NUM = 50;
  const drops = [];

  const setup = () => {
    canvasWidth = s.displayWidth * 0.95;
    canvasHeight = canvasWidth;
    s.createCanvas(canvasWidth, canvasHeight);
    for (let i = 0; i< s.random(MIN_DROP_NUM, MAX_DROP_NUM); i++) {
      drops.push(new Drop(canvasWidth, canvasHeight, s));
    }
  };

  const draw = () => {
    if (s.touches.length > 0) {
      const dropNum = s.map(
        s.touches[0].x, 0, canvasWidth, MIN_DROP_NUM, MAX_DROP_NUM
      );
      if (dropNum > drops.length) {
        for (let i = 0; i< dropNum - drops.length; i++) {
          drops.push(new Drop(canvasWidth, canvasHeight, s));
        }
      } else {
        drops.splice(dropNum);
      }
    }
    s.background(230, 230, 250);
    s.stroke(255);
    s.strokeWeight(1);
    s.text('new version', 10, 30);
    for (let drop of drops) {
      drop.update();
      drop.draw();
    }
  };

  s.setup = setup;
  s.draw = draw;
}, document.getElementById('container'));
