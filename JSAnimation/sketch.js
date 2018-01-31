p5.disableFriendlyErrors = true; //this should improve performance
let flock;
let mono;
function preload() {
	mono = loadFont('font/SourceCodePro-Black.otf');
  }
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
function setup() {
	// let div = document.getElementById('myContainer');
	// let w = div.offsetWidth;
	// let h = div.offsetHeight;
	textFont(mono);
	let cnv = createCanvas(windowWidth, windowHeight);
	cnv.position(0, 0);
	cnv.style('z-index', '-1');
	cnv.style('position', 'fixed')
	flock = new Flock(10);
	let myCnv = document.getElementById('defaultCanvas0');
	myCnv.style.position = 'fixed';
}

function draw() {
	background(255);
	flock.update();
	flock.show();
}
/**
 * DEPRECATED
 * this function returns the height of a page,
 * including the part to be scrolled
 */
function h() {
	return document.documentElement.scrollHeight;
}