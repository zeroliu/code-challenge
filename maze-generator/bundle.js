!function(i){function t(s){if(e[s])return e[s].exports;var r=e[s]={exports:{},id:s,loaded:!1};return i[s].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var e={};return t.m=i,t.c=e,t.p="",t(0)}([function(i,t,e){"use strict";function s(i){return i&&i.__esModule?i:{default:i}}var r=e(1),n=s(r);new p5(function(i){var t=20,e=void 0,s=void 0,r=void 0,o=void 0,a=void 0,l=void 0,h=function(i,t){i.x-t.x!==0?i.x>t.x?(i.removeWall(n.default.Direction.LEFT),t.removeWall(n.default.Direction.RIGHT)):(i.removeWall(n.default.Direction.RIGHT),t.removeWall(n.default.Direction.LEFT)):i.y>t.y?(i.removeWall(n.default.Direction.TOP),t.removeWall(n.default.Direction.BOTTOM)):(i.removeWall(n.default.Direction.BOTTOM),t.removeWall(n.default.Direction.TOP))},u=function(){i.frameRate(10),e=i.floor(.95*i.displayWidth),e-=e%10,s=e,i.createCanvas(e,s),r=e/t,o=[];for(var h=0;h<t;h++){o.push([]);for(var u=0;u<t;u++){var f=new n.default(i,h,u,r);o[h].push(f)}}a=[],l=o[0][0],l.visited=!0},f=function(){i.touches.length>0&&i.frameRate(i.map(i.touches[0].x,0,e,5,60));var t=l.getUnvisitedNeighbor(o);if(t)h(l,t),t.visited=!0,a.push(l),l=t;else if(l=a.pop(),!l)return void i.noLoop();i.background(0),o.forEach(function(i){return i.forEach(function(i){return i.draw()})}),i.noStroke(),i.fill(255),i.rect(l.x*r,l.y*r,r,r)};i.setup=u,i.draw=f},document.getElementById("container"))},function(i,t){"use strict";function e(i,t){if(!(i instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function i(i,t){for(var e=0;e<t.length;e++){var s=t[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(i,s.key,s)}}return function(t,e,s){return e&&i(t.prototype,e),s&&i(t,s),t}}(),r=function(){function i(t,s,r,n){e(this,i),this.s=t,this.x=s,this.y=r,this.size=n,this.wall=15,this.visited=!1}return s(i,[{key:"removeWall",value:function(i){this.wall&=~(1<<i)}},{key:"getUnvisitedNeighbor",value:function(i){var t=[];if(this.y>0){var e=i[this.x][this.y-1];!e.visited&&t.push(e)}if(this.x<i.length-1){var s=i[this.x+1][this.y];!s.visited&&t.push(s)}if(this.y<i[this.x].length-1){var r=i[this.x][this.y+1];!r.visited&&t.push(r)}if(this.x>0){var n=i[this.x-1][this.y];!n.visited&&t.push(n)}if(t.length>0){var o=this.s.floor(this.s.random(0,t.length));return t[o]}return null}},{key:"draw",value:function(){this.s.stroke(0,155,45);var t=this.x*this.size,e=this.y*this.size;this.wall&1<<i.Direction.TOP&&this.s.line(t,e,t+this.size,e),this.wall&1<<i.Direction.RIGHT&&this.s.line(t+this.size,e,t+this.size,e+this.size),this.wall&1<<i.Direction.BOTTOM&&this.s.line(t,e+this.size,t+this.size,e+this.size),this.wall&1<<i.Direction.LEFT&&this.s.line(t,e,t,e+this.size),this.visited&&(this.s.noStroke(),this.s.fill(237,178,0,100),this.s.rect(t,e,this.size,this.size))}}]),i}();r.Direction={TOP:0,RIGHT:1,BOTTOM:2,LEFT:3},t.default=r}]);