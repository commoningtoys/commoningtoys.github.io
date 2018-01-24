let myClasses = ["team", "project", "sBlog", "moodBoard"];
/**
 * Object to store visibility and name of classes
 * @param {String} _name - name of the class
 * @param {boolean} _visible - boolean to set the visibility of the class
 */
function ClassObject(_name, _visible){
    this.name = _name;
    this.visible = _visible;
}

let ClassObjects = [];
for(let i = 0; i < myClasses.length; i++){
    ClassObjects.push(new ClassObject(myClasses[i], true));
}

/**
 * function that reveals only certain elements of the website
 * @param {String} className - the class that needs to be set to 'display: none;' 
 */
function reveal(className){
    //here we set the visibility of the classes
    //we set them to true if the className matches with a ClassOject
    for(let i = 0; i < ClassObjects.length; i++){
        if(ClassObjects[i].name.includes(className)){
            ClassObjects[i].visible = true;
            let thisClass = document.getElementsByClassName(ClassObjects[i].name);
            for(let j = 0; j < thisClass.length; j++){
                    thisClass[j].style.display = 'block';
                }
        }else{
            ClassObjects[i].visible = false;
            let thisClass = document.getElementsByClassName(ClassObjects[i].name);
            for(let j = 0; j < thisClass.length; j++){
                    thisClass[j].style.display = 'none';
                }
        }
    }
}
/**
 * this function initializes the width and heights of all the divs
 */
function init(){
    for(let i = 0; i < myClasses.length; i++){
        let thisClass = document.getElementsByClassName(myClasses[i]);
        for(let j = 0; j < thisClass.length; j++){
            let randW = Math.random() * 60;
            let randH = Math.random() * 500;
            let randM = Math.random() * 5;
            thisClass[j].style.width = Math.floor(randW) + '%';
            thisClass[j].style.height = Math.floor(randH) +'px';
            thisClass[j].style.margin = Math.floor(randM) +'%';

        }
    }
}
/**
 * this function returns a random number between two numbers
 * @param {float} a 
 * @param {float} b 
 * @returns {float} random number between the input numbers
 */
function Random(a, b){
    //if a is smaller than b we should swap them
    if(b < a){
        let Swap = b;
        b = a;
        a = Swap;
    }
    let c = Math.abs(a - b);
    return a + (Math.random() * c);
}