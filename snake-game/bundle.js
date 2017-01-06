!function(t){function i(s){if(e[s])return e[s].exports;var n=e[s]={exports:{},id:s,loaded:!1};return t[s].call(n.exports,n,n.exports,i),n.loaded=!0,n.exports}var e={};return i.m=t,i.c=e,i.p="",i(0)}([function(t,i,e){"use strict";var s=e(1),n=e(2);new p5(function(t){var i=10,e=300,r=300,o=void 0,a=void 0,h=function(){t.createCanvas(e,r),t.ellipseMode(t.CORNER),o=new s(e,r,i,t),a=new n(e,r,i,t)},u=function(){t.background(0),a.tryGenerate(),o.move(),a.hasFood(o.x,o.y)&&(a.remove(o.x,o.y),o.grow()),o.didHit()&&(a.reset(),o.reset()),o.draw(),a.draw()},c=function(){var i=void 0,e=void 0;switch(t.keyCode){case t.UP_ARROW:i=0,e=-1;break;case t.DOWN_ARROW:i=0,e=1;break;case t.LEFT_ARROW:i=-1,e=0;break;case t.RIGHT_ARROW:i=1,e=0}o.turn(i,e)};t.setup=h,t.draw=u,t.keyPressed=c},document.getElementById("container"))},function(t,i){"use strict";function e(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}var s=function(){function t(t,i){for(var e=0;e<i.length;e++){var s=i[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(i,e,s){return e&&t(i.prototype,e),s&&t(i,s),i}}(),n=5,r=10,o=4,a=function(){function t(i,s,a,h){e(this,t),this.canvasWidth=i,this.canvasHeight=s,this.size=a,this.s=h,this.x=h.floor(h.random(0,i)),this.x-=this.x%a,this.y=h.floor(h.random(0,s)),this.y-=this.y%a,this.bodies=[],this.dx=1,this.dy=0,this.growPoint=o,this.countdown=r-n}return s(t,[{key:"move",value:function(){if(this.countdown--,!(this.countdown>0)){this.countdown=r-n;var t=this.x+this.dx*this.size,i=this.y+this.dy*this.size;this.bodies.unshift({x:this.x,y:this.y}),this.x=t,this.y=i,this.growPoint>0?this.growPoint--:this.bodies.pop()}}},{key:"grow",value:function(){this.growPoint++}},{key:"turn",value:function(t,i){(t&&!i||!t&&i)&&(t&&!this.dx?(this.dx=t,this.dy=0):i&&!this.dy&&(this.dx=0,this.dy=i))}},{key:"didHit",value:function(){if(this.x>=this.canvasWidth||this.x<0||this.y>=this.canvasHeight||this.y<0)return!0;var t=!0,i=!1,e=void 0;try{for(var s,n=this.bodies[Symbol.iterator]();!(t=(s=n.next()).done);t=!0){var r=s.value;if(r.x===this.x&&r.y===this.y)return!0}}catch(t){i=!0,e=t}finally{try{!t&&n.return&&n.return()}finally{if(i)throw e}}return!1}},{key:"reset",value:function(){this.x=this.s.floor(this.s.random(0,this.canvasWidth)),this.x-=this.x%this.size,this.y=this.s.floor(this.s.random(0,this.canvasHeight)),this.y-=this.y%this.size,this.bodies=[],this.dx=1,this.dy=0,this.growPoint=o,this.countdown=r-n}},{key:"draw",value:function(){this.s.fill("red"),this.s.rect(this.x,this.y,this.size,this.size),this.s.fill(255);var t=!0,i=!1,e=void 0;try{for(var s,n=this.bodies[Symbol.iterator]();!(t=(s=n.next()).done);t=!0){var r=s.value;this.s.rect(r.x,r.y,this.size,this.size)}}catch(t){i=!0,e=t}finally{try{!t&&n.return&&n.return()}finally{if(i)throw e}}}}]),t}();t.exports=a},function(t,i){"use strict";function e(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}var s=function(){function t(t,i){for(var e=0;e<i.length;e++){var s=i[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(i,e,s){return e&&t(i.prototype,e),s&&t(i,s),i}}(),n=.001,r=function(){function t(i,s,n,r){e(this,t),this.canvasWidth=i,this.canvasHeight=s,this.size=n,this.s=r,this.locationMap={}}return s(t,[{key:"tryGenerate",value:function(){(0===Object.keys(this.locationMap).length||this.s.random(0,1)<n)&&this.generate()}},{key:"generate",value:function(){var t=this.s.floor(this.s.random(0,this.canvasWidth));t-=t%this.size;var i=this.s.floor(this.s.random(0,this.canvasHeight));i-=i%this.size,this.locationMap[this.parseKey(t,i)]={x:t,y:i}}},{key:"parseKey",value:function(t,i){return t+"_"+i}},{key:"hasFood",value:function(t,i){return!!this.locationMap[this.parseKey(t,i)]}},{key:"remove",value:function(t,i){delete this.locationMap[this.parseKey(t,i)]}},{key:"reset",value:function(){this.locationMap={}}},{key:"draw",value:function(){for(var t in this.locationMap){var i=this.locationMap[t];this.s.ellipse(i.x,i.y,this.size,this.size)}}}]),t}();t.exports=r}]);