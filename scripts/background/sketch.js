/** 
* HOME PAGE CANVAS
*/

// CANVAS SETUP //

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var cW = (canvas.width = window.innerWidth);
var cH = (canvas.height = window.innerHeight);
const cColor = (canvas.style.backgroundColor = "black");

// GLOBALS //

var stars = [];
var asteroids = [];
var boostParticles = [];
var otherShips = [];
var ship = new Ship(cW, cH / 2, 1);
const fps = 30;
const starCount = cW;

// MAIN //

window.addEventListener("load", setup);

window.addEventListener("resize", () => { 
  // resizing the window will reload the canvas to match new dimensions
  if (window.innerWidth != cW) {
    resetup();
  }
});

setInterval(draw, 1000 / fps);  // repeats the draw function at the set FPS

// FUNCTIONS //

function draw() {
	/**
	* Draws every instance to the background canvas
	*/
  clearCanvas();
  for (let star of stars) {
    star.updatePosition();
    star.draw(ctx);
  }
  for (let asteroid of asteroids) {
    asteroid.update();
    asteroid.draw(ctx);
  }
  for (let ship of otherShips) {
    ship.update();
    ship.draw(ctx);
  }
  for (let boost of boostParticles) {
    boost.update(cW);
    boost.draw(ctx);
  }
  ship.float();
  ship.draw(ctx);
}

function setup() {
  addStars();
  addAsteroids();
  addBoost();
  addOtherShips();
}

function addStars() {
  /** 
  * Adds stars at random positions and distances 
  */
  for (let i = 0; i < starCount; i++) {
    stars.push(new Star(rand(cW), rand(cH), getDistance()));
  }
}

function addAsteroids() { 
  /**
  * Adds all asteroids to the asteroids array. There is a 1/100 chance 
  * to spawn an asteroid until there are 15 total.
  */
  for (let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid(rand(cW), rand(cH), getDistance()));
  }
}

function addBoost() {
  /**
  * Adds all boost to the asteroid array. Will add boost until it has 
  * reached the end of the screen.
  */
  for (let i = 0; i < cW; i++) {
    boostParticles.push(new Boost(ship.pos.x + 80 + i, ship.pos.y - 1));
  }
}

function addOtherShips() {
  for (let i = 0; i < 10; i++) {
    otherShips.push(new OtherShip(rand(1000) * -1, rand(cH), getDistance()));
  }
}

function getDistance() {
  /**
  * Shortens the process of getting a random distance.
  */
  return rand(9) + 1;
}

function rand(n) {
  /**
  * Shortens the process of getting a random number.
  */
  return Math.floor(Math.random() * n);
}

function resetup() {
  /**
  * Resets the instances on the canvas for screen resizes 
  */
  stars = [];
  asteroids = [];
  boostParticles = [];
  otherShips = [];
  cW = canvas.width = window.innerWidth;
  cH = canvas.height = window.innerHeight;
  ship = new Ship(cW, cH / 2, 1);
  setup();
}

function clearCanvas() {
  /**
  * Wipes the canvas in between each frame to display updated positions.
  */
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = cColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
