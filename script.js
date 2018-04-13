/*************************************
 * constant of pixel ratio of device *
 *************************************/
const pix = window.devicePixelRatio;
/***********************************/
let myClasses = ["team", "project", "process", "inspiration", "german", "output"];
// let myTags = ['yano', 'micha', 'shintaro', 'selena', 'viktor', 'kayla']
/**
 * Object to store visibility and name of classes
 * @param {String} _name - name of the class
 * @param {boolean} _visible - boolean to set the visibility of the class
 */
function ClassObject(_name, _visible) {
    this.name = _name;
    this.visible = _visible;
}

let ClassObjects = [];
for (let i = 0; i < myClasses.length; i++) {
    ClassObjects.push(new ClassObject(myClasses[i], true));
}

/**
 * function that reveals only certain elements of the website
 * @param {String} className - the class that needs to be shown! 
 */
function reveal(className) {
    window.scrollTo(0, 0);
    console.log('imWorking');
    for (let i = 0; i < ClassObjects.length; i++) {
        if (ClassObjects[i].name.includes(className)) {
            ClassObjects[i].visible = true;
            let thisClass = document.getElementsByClassName(ClassObjects[i].name);
            for (let j = 0; j < thisClass.length; j++) {
                thisClass[j].style.display = 'block';
            }
        } else {
            ClassObjects[i].visible = false;
            let thisClass = document.getElementsByClassName(ClassObjects[i].name);
            for (let j = 0; j < thisClass.length; j++) {
                thisClass[j].style.display = 'none';
            }
        }
    }
}
/**
 * function that shows all the posts of the wesite
 */
function showAll() {
    for (let i = 0; i < myClasses.length; i++) {
        let thisClass = document.getElementsByClassName(myClasses[i]);
        for (let j = 0; j < thisClass.length; j++) {
            thisClass[j].style.display = 'block';
        }
    }
}
/**
 * this function initializes the width and heights of all the divs
 */
function init() {
    for (let i = 0; i < myClasses.length; i++) {
        let thisClass = document.getElementsByClassName(myClasses[i]);
        for (let j = 0; j < thisClass.length; j++) {
            let randW = Random(20, 60);
            thisClass[j].style.width = Math.floor(randW) + '%';
            let randH = thisClass[j].style.width;
            thisClass[j].style.height = Math.floor(randH) + 'px';

        }
    }
    //set the first div project to width 100%
    //needs refactoring
    let mainPage = document.getElementById('mainPage');
    mainPage.style.width = 'auto';
    mainPage.style.height = 'auto';
    if (screen.width > 899) setNumberOfColumns(mainPage, '2');
    else setNumberOfColumns(mainPage, 'initial');
}
/**
 * stes the position of the divs below the menu bar
 */
function setPositionContainer() {
    let container = document.getElementById("myContainer");
    //here we set the header image near the menu button when on device
    let menu = BoundsById('menuIcon');
    let headerDiv = BoundsById('myHeader');

    if (screen.width < 899) {
        let w = screen.width - menu.width;
        let headerImg = document.getElementById('myHeader');
        headerImg.style.width = w + 'px';
        headerImg.style.left = menu.width + 'px';
    }
}
/**
 * this function returns the bounds of the menu at any time
 */
function BoundsById(id) {
    return document.getElementById(id).getBoundingClientRect();
}


/**
 * function to show hide the menu
 */
let icon1 = 'img/icons/icon_01.png';
let icon2 = 'img/icons/icon_02.png';
// let menuIsShow = true;
let menuIsShow = true;
function closeOpenMenu() {
    menuIsShow = !menuIsShow;//every click we change the status of the boolean
    let myTags = document.getElementsByTagName('menuelement');
    let displayOption;
    for (let i = 0; i < myTags.length; i++) {
        menuIsShow == false ? myTags[i].style.display = 'none' : myTags[i].style.display = 'inherit';
    }
    let myMenu = document.getElementById('myMenu');
    // menuIsShow == false ? myMenu.style.width = 'auto' : myMenu.style.width = 'auto';
    let button = document.getElementById('openClose');
    // menuIsShow == true ? button.innerHTML = 'Close Menu' : button.innerHTML = 'Show Menu';

    menuIsShow == true ? document.getElementById('menuIcon').src = icon1 : document.getElementById('menuIcon').src = icon2;
}
/**
 * this function enlarges the divs by clicking on them
*/
function enlargeDivs() {
    let previous = null, prevH, prevW, prev;
    // needs refactoring
    $(".project, .process, .inspiration, .output, .german").click(function () {
        let myDiv = this;
        if (previous == null) {
            // continue;
            //needs refactoring!!!!!!!
        } else {
            //reset the previous clicked div to its initial state
            setNumberOfColumns(previous, 'initial');
            previous.style.height = prevH;
            previous.style.width = prevW;
            previous.style.overflowY = 'scroll';
        }
        //let's save the div so we can reset it later
        previous = this;
        prevH = this.style.height;
        prevW = this.style.width;
        //here we enlarge the div
        myDiv.style.overflowY = 'hidden';
        myDiv.style.width = '100%';
        myDiv.style.height = 'auto';
        if(!myDiv.className.includes('inspirationContent'))myDiv.style.height = '100vh';
        console.log(myDiv.className.includes('inspiration'));
        //here we set the number of columns
        if (screen.width > 899 && !myDiv.className.includes('inspiration')) setNumberOfColumns(myDiv, '2');
        //here we get the height of the top menu (needs refactoring set it as gloal variable)
        let y = parseFloat(this.getBoundingClientRect().y) + window.scrollY; //this helps us to get the position of the div to scroll to
        window.scrollTo(0, y);
        // goTo(0, y);
    });
}
/**
 * this function returns the device orientation in angles
 */
function getOrientation() {
    return window.screen.orientation.angle;
}
/**
 * this function sets the number of columns of a div
 * @param {HTML Dom element} el 
 * @param {String} num - number of columns to be set
 */
function setNumberOfColumns(el, num) {
    el.style.columnCount = num;
    el.style.MozColumnCount = num;
    el.style.WebkitColumnCount = num;
}
/**
 * function to set the rotation of divs     
 * @param {HTMLElement} el - the element to be rotated
 * @param {Number} deg - degree of rotation
 */
function setRotation(el, deg) {
    el.style.transform = 'rotate(' + deg + 'deg)';
    el.style.WebkitTransform = 'rotate(' + deg + 'deg)';
    el.style.MozTransform = 'rotate(' + deg + 'deg)';
}
/**
 * this function returns a random number between two numbers
 * @param {Number} a 
 * @param {Number} b 
 * @returns {Number} random number between the input numbers
 */
function Random(a, b) {
    //if a is smaller than b we should swap them
    if (b < a) {
        let Swap = b;
        b = a;
        a = Swap;
    }
    let c = Math.abs(a - b);
    return a + (Math.random() * c);
}