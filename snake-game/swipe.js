const TIME_TRASHOLD = 1;
const DIFF_TRASHOLD = 5;

class Swipe {
  constructor(swipeDetectedCallback, sketch) {
    this.swipeDetectedCallback = swipeDetectedCallback;
    this.s = sketch;

    this.timeDown = 0;
    this.xDown = null;
    this.yDown = null;
    this.xMove = null;
    this.yMove = null;
    this.started = false;
  }

  startTouch() {
    this.started = true;
    this.timeDown = this.s.frameCount;
    this.xDown = this.s.touches[0].x;
    this.yDown = this.s.touches[0].y;
    this.xMove = null;
    this.yMove = null;
  }

  moveTouch() {
    if (this.s.frameCount - this.timeDown > TIME_TRASHOLD) {
      // timeout, calculate diff and detect swipe
      //this.started = false;
      this.xMove = this.s.touches[0].x;
      this.yMove = this.s.touches[0].y;
      const xDiff = this.xMove - this.xDown;
      const yDiff = this.yMove - this.yDown;

      if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > DIFF_TRASHOLD) {
        if (xDiff > 0) {
          this.swipeDetectedCallback(1, 0);
        } else {
          this.swipeDetectedCallback(-1, 0);
        }
      } else if (Math.abs(xDiff) < Math.abs(yDiff) && Math.abs(yDiff) > DIFF_TRASHOLD) {
        if (yDiff > 0) {
          this.swipeDetectedCallback(0, 1);
        } else {
          this.swipeDetectedCallback(0, -1);
        }
      }
    }
  }
}

module.exports = Swipe;
