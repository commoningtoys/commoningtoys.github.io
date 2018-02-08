p5.disableFriendlyErrors = true; //this should improve performance
let flock;
let mono;
let toys = 'TOYS ', games = 'GAMES', swap = '', changingWord = toys, changeWord = false;
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
	if (mouseIsPressed) flock.formSentence(mouseX, mouseY);
	else flock.setFormingSentence(false);
	textSize(40);
	///needs refactoring
	// if (swappingIndexes.length < 5) {
	// 	swappingIndex = floor(random(toys.length));
	// 	if (swappingIndexes.length == 0) swappingIndexes.push(swappingIndex);
	// 	else {
	// 		for (let i = 0; i < swappingIndexes.length; i++) {
	// 			if(swappingIndex != swappingIndexes[i])swappingIndexes.push(swappingIndex);
	// 		}
	// 	}
	// } else {
	// 	swappingIndexes = [];
	// }

	// console.table(swappingIndexes);
	if(frameCount % 50 == 0)changeWord = !changeWord;
	changingWord = changeWord == true ? toys : games;
	fill('#00CCFF');
	text('THINKING \n' + changingWord + '\nFOR COMMONING', 300, 300);
}
// function mouseClicked(){
// 	flock.formSentence(mouseX, mouseY);
// }
/**
 * DEPRECATED
 * this function returns the height of a page,
 * including the part to be scrolled
 */
function h() {
	return document.documentElement.scrollHeight;
}