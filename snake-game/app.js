const Snake = require('./snake');
const FoodList = require('./food_list');
const Swipe = require('./swipe');

new p5((s) => {
  let canvasWidth, canvasHeight, size, snake, foodList, swipe;
  const swipeDetected = (dx, dy) => {
    snake.turn(dx, dy);
  };

  const setup = () => {
    swipe = new Swipe(swipeDetected, s);
    canvasWidth = s.displayWidth * 0.95;
    canvasHeight = canvasWidth;
    size = s.floor(canvasWidth / 30);
    s.createCanvas(canvasWidth, canvasHeight);
    s.ellipseMode(s.CORNER);
    snake = new Snake(canvasWidth, canvasHeight, size, s);
    foodList = new FoodList(canvasWidth, canvasHeight, size, s);
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
  s.touchStarted = () => swipe.startTouch();
  s.touchMoved = () => swipe.moveTouch();
}, document.getElementById('container'));
