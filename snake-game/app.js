const p5 = require('p5');
const Snake = require('./snake');
const FoodList = require('./food_list');

new p5((s) => {
  const SIZE = 10;
  const WIDTH = 300;
  const HEIGHT = 300;
  let snake, foodList;
  const setup = () => {
    s.createCanvas(WIDTH, HEIGHT);
    s.ellipseMode(s.CORNER);
    snake = new Snake(WIDTH, HEIGHT, SIZE, s);
    foodList = new FoodList(WIDTH, HEIGHT, SIZE, s);
  };

  const draw = () => {
    s.background(0);
    foodList.tryGenerate();
    snake.move();
    if (foodList.hasFood(snake.x, snake.y)) {
      foodList.remove(snake.x, snake.y);
      snake.grow();
    }
    if (snake.didHit()) {
      foodList.reset();
      snake.reset();
    }
    snake.draw();
    foodList.draw();
  };

  const keyPressed = () => {
    let dx, dy;
    switch (s.keyCode) {
      case s.UP_ARROW:
        dx = 0;
        dy = -1;
        break;
      case s.DOWN_ARROW:
        dx = 0;
        dy = 1;
        break;
      case s.LEFT_ARROW:
        dx = -1;
        dy = 0;
        break;
      case s.RIGHT_ARROW:
        dx = 1;
        dy = 0;
        break;
    }
    snake.turn(dx, dy);
  };

  s.setup = setup;
  s.draw = draw;
  s.keyPressed = keyPressed;
}, document.getElementById('container'));
