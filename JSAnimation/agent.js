class Agent {
    /**
     * Agent constructor
     * @param {float} x - pos on the x axis
     * @param {float} y - pos on y axis
     * @param {char} _chr - the char to be displayed
     */
    constructor(x, y, _chr) {
        this.pos = createVector(x, y),
            this.target = createVector(),
            this.vel = createVector(),
            this.acc = createVector(),
            this.r = 32, this.speed = 5, this.force = 0.3;
            this.chr = _chr;
    }
    /**
     * show the agent as circle with a directional nose
     */
    show() {
        textSize(32);
        strokeWeight(0.5);
        line(this.pos.x, this.pos.y, this.target.x, this.target.y);
        fill(0);
        noStroke();
        //stroke(0, 255, 0);
        //float theta = this.vel.heading();
        push();
        translate(this.pos.x, this.pos.y);
        //rotate(theta + PI/2);
        //line(0, 0, 0, -this.r * 2);
        text(this.chr, 0, 0);
        // ellipse(0, 0, this.r, this.r);
        pop();
    }
    /**
     * update the agent this.pos using vector math
     * given a this.target the agent tries to reach it
     *
     * when the agent reaches the bar drinks
     * and than looks around to see if there are friends nearby
     * in this case we use the function dist to check the distance
     * and we compare it with the compatibility of the agent
     */
    update() {
        // edges();
        // Update this.velocity
        this.vel.add(this.acc);
        // Limit this.speed
        this.vel.limit(this.speed);
        this.pos.add(this.vel);
        // Reset accelertion to 0 each cycle
        this.acc.mult(0);
    }
    /**
     * set a new this.target for the agent
     * @param {PVector} p - vector element of the this.pos to reach
     */
    settarget(p) {
        this.target = p;
    }
    //returns if the agent has reached his this.target
    targetReached() {
        let d = PVector.dist(this.pos, this.target);
        return (d < 10);
    }
    edges() {    //off-screen wrap around  
        if (this.pos.x < 0) this.vel.mult(-1);
        if (this.pos.x > width) this.vel.mult(-1);
        if (this.pos.y < 0) this.vel.mult(-1);
        if (this.pos.y > height) this.vel.mult(-1);
        //if (this.pos.x < 0) this.pos.x = width;
        //if (this.pos.x > width) this.pos.x = 0;
        //if (this.pos.y < 0) this.pos.y = height;
        //if (this.pos.y > height) this.pos.y = 0;
    }
    // applyForce(force) {
    //     // We could add mass here if we want A = F / M
    //     this.acc.add(force);
    // }
    /**
     * The functions below are from Nature of Code
     * Separation and Seek by Daniel Shiffman
     * http://natureofcode.com
     */
    applyBehaviors(agents) {
        let separateForce = separate(agents, this, this.r);
        let seekForce = seek(this);
        separateForce.mult(2.0);
        seekForce.mult(1.5);
        this.acc.add(separateForce);
        this.acc.add(seekForce);
        // applyForce(separateForce);
        // applyForce(seekForce);
    }

}
// Separation
// Method checks for nearby Agents and steers away
function separate(Agents, agent, r) {
    let desiredseparation = r * 1.2;
    let sum = createVector();
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < Agents.length; i++) {
        let other = Agents[i];
        let d = p5.Vector.dist(agent.pos, other.pos);
        // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
        if ((d > 0) && (d < desiredseparation)) {
            // Calculate vector pointing away from neighbor
            let diff = p5.Vector.sub(agent.pos, other.pos);
            diff.normalize();
            diff.div(d);        // Weight by distance
            sum.add(diff);
            count++;            // Keep track of how many
        }
    }
    // Average -- divide by how many
    if (count > 0) {
        sum.div(count);
        // Our desired vector is the average scaled to maximum this.speed
        sum.normalize();
        sum.mult(agent.speed);
        // Implement Reynolds: Steering = Desired - this.vel
        sum.sub(agent.vel);
        sum.limit(agent.force);
    }
    return sum;
}

// A method that calculates a steering this.force towards a this.target
// STEER = DESIRED MINUS this.vel
function seek(agent) {
    let desired = p5.Vector.sub(agent.target, agent.pos);  // A vector pointing from the this.pos to the this.target
    // Normalize desired and scale to maximum this.speed
    desired.normalize();
    desired.mult(agent.speed);
    // Steering = Desired minus this.vel
    let steer = p5.Vector.sub(desired, agent.vel);
    steer.limit(agent.force);  // Limit to maximum steering this.force

    return steer;
}