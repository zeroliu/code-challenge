/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Star = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	const STAR_SPEED = 10;
	const STAR_RADIUS = 8;

	class Star {
	  constructor(width, height, sketch) {
	    this.width = width;
	    this.height = height;
	    this.s = sketch;
	    this.x = this.s.random(-this.width/2, this.width/2);
	    this.y = this.s.random(-this.height/2, this.height/2);
	    this.z = this.s.random(0, this.width);
	    this.speed = STAR_SPEED / 2;
	  }

	  update() {
	    if (this.s.touches.length > 0) {
	      this.speed = this.s.map(
	        this.s.touches[0].x, 0, this.width, 5, STAR_SPEED
	      );
	    }
	    this.z -= this.speed;
	    if (this.z < 1) {
	      this.x = this.s.random(-this.width/2, this.width/2);
	      this.y = this.s.random(-this.height/2, this.height/2);
	      this.z = this.width;
	    }
	  }

	  render() {
	    const x = this.s.map(this.x / this.z, 0, 1, 0, this.width);
	    const y = this.s.map(this.y / this.z, 0, 1, 0, this.height);
	    const r = STAR_RADIUS * (1 - this.z / this.width);
	    this.s.ellipse(x, y, r, r);
	  }
	}

	module.exports = Star;


/***/ }
/******/ ]);