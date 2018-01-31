let flock;
function windowResized(){
	resizeCanvas(windowWidth, h());
}
function setup() {
	// let div = document.getElementById('myContainer');
	// let w = div.offsetWidth;
	// let h = div.offsetHeight;
	console.log(h());
	let cnv = createCanvas(windowWidth, h());
	cnv.position(0, 0);
	cnv.style('z-index', '-1');
	flock = new Flock(10);
}

function draw() {
	background(255);
	flock.update();
	flock.show();
}
function h (){
	return document.documentElement.scrollHeight;
}