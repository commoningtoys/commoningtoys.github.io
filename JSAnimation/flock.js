let txt = 'THINKING TOYS (OR GAMES) FOR COMMONING';
let isFormingSentence = false;
let sentenceTargets = [];

let counter = 0;
class Flock {

    constructor() {
        this.mouse = createVector();
        this.agents = [];
        for (let i = 0; i < txt.length; i++) {
            this.agents.push(new Agent(random(width), random(height), txt.charAt(i)));
        }
    }
    show() {
        // noFill();
        // strokeWeight(2);
        // stroke('#00CCFF');
        // beginShape();
        // for (let i = 0; i < this.agents.length; i++) {
        //     // this.agents[i].show();
        //     vertex(this.agents[i].pos.x, this.agents[i].pos.y);
        // }
        // endShape();
        for (let i = 0; i < this.agents.length; i++) {
            this.agents[i].show();
        }
    }
    update() {
        this.mouse = createVector(mouseX, mouseY);
        for (let i = 0; i < this.agents.length; i++) {
            if (!isFormingSentence) this.agents[i].settarget(this.mouse);
            else {
                // console.log(sentenceTargets[i])
                this.agents[i].settarget(sentenceTargets[i]);
                // if (this.agents[i].targetReached()) counter++;
                // if (counter >= txt.length) {
                //     isFormingSentence = false;
                //     counter = 0;
                // }
            }
            this.agents[i].applyBehaviors(this.agents);
            this.agents[i].update();
        }
    }
    /**
     * this function adds target vector to an array
     * @param {float} x - position of mouseX
     * @param {float} y - position of mouse Y
     */
    formSentence(x, y) {
        // console.log('im working')
        sentenceTargets = [];
        isFormingSentence = true;
        let kerning = 0;
        let letterSpace = this.agents[0].getRadius()/2 + kerning;
        let sentenceWidth = letterSpace * txt.length;
        console.log(this.agents[0].getRadius());
        for (let i = 0; i < txt.length; i++) {
            let leftStart = x - (sentenceWidth / 2);//starting point of the formed sentence
            let posX = leftStart + (i * letterSpace);
            // let y = mouseY;
            sentenceTargets.push(createVector(posX, y));
            // this.agents[i].settarget(target);
        }
    }
    /**
     * sets the boolean of isFormingSentence
     * useful to end the animation of the letters
     * @param {boolean} val - true or false
     */
    setFormingSentence(val){
        isFormingSentence = val;
    }
}