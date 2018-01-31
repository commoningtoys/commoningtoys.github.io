let txt = 'COMMONINGTOYS';
class Flock{

    constructor(){
        this.mouse = createVector();
        this.agents = [];
        for(let i = 0; i < txt.length; i++){
            this.agents.push(new Agent(random(width), random(height), txt.charAt(i)));
        }
    }
    show(){
        for(let i = 0; i < this.agents.length; i++)this.agents[i].show();
    }
    update(){
        this.mouse = createVector(mouseX, mouseY);
        for(let i = 0; i < this.agents.length; i++){
            this.agents[i].settarget(this.mouse);
            this.agents[i].applyBehaviors(this.agents);
            this.agents[i].update();
        }
    }
}