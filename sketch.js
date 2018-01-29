let pos, target, vel, moving = false, c1, c2;
function setup() {
    noCanvas();
    pos = createVector(0, 0);
    target = createVector(0, 0);
    vel = createVector(0, 0);
    c1 = color(255, 85, 0);
    c2 = color(0, 204, 255);
}

function draw() {
    if (moving){
        seek(target);
        window.scrollTo(pos.x, pos.y);
        if(targetReached())moving = false;        
    }
}

function goTo(x, y){
    moving = true;
    target = createVector(x, y);
}

function targetReached(){
    return p5.Vector.dist(pos, target) < 5;
}

function seek(vector){
    let dir = p5.Vector.sub(target, pos);
    dir.normalize();
    dir.mult(5);
    vel.add(dir);
    vel.limit(10);
    pos.add(vel);
}