/*************************************
 * constant of pixel ratio of device *
 *************************************/
const pix = window.devicePixelRatio;
/***********************************/
let myClasses = ["team", "project", "sBlog", "moodBoard"];
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
 * @param {String} className - the class that needs to be set to 'display: none;' 
 */
function reveal(className) {
    window.scrollTo(0, 0);
    // showAll();
    console.log('imWOrking');
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
// /**
//  * reveals elements based on tag name
//  * @param {String} tagName - name of the tag to be searched
//  */
// function revealTag(tagName) {
//     showAll();
//     for (let i = 0; i < myTags.length; i++) {
//         if (myTags[i].includes(tagName)) {
//             // myTags[i].visible = true;
//             let thisClass = document.getElementsByTagName(myTags[i]);
//             for (let j = 0; j < thisClass.length; j++) {
//                 thisClass[j].style.display = 'block';
//             }
//         } else {
//             // myTags[i].visible = false;
//             let thisClass = document.getElementsByTagName(myTags[i]);
//             for (let j = 0; j < thisClass.length; j++) {
//                 thisClass[j].style.display = 'none';
//             }
//         }
//     }
// }
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
 * and sets the footer at the bottom of the page
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
    if (screen.width > 699) setNumberOfColumns(mainPage, '2');
    else setNumberOfColumns(mainPage, 'initial');
}
/**
 * stes the position of the divs below the menu bar
 */
function setPositionContainer() {
    let container = document.getElementById("myContainer");
    // let w = menuBounds().width;
    // console.log(w);
    // container.style.left = w + 'px';
    let h = BoundsById('menuIcon');
    console.log(h.height);
    if(screen.width < 699)container.style.top = h.height+ 'px';
    // console.log(window.innerWidth - w);
    // container.style.top = menuBounds().height + 10 + 'px';
    // let foot = document.getElementById('myFoot');
    // if(foot != undefined)foot.style.width = window.innerWidth;
}
/**
 * this function returns the bounds of the menu at any time
 */
function BoundsById(id) {
    return document.getElementById(id).getBoundingClientRect();
}

/**
 * this function returns a random number between two numbers
 * @param {float} a 
 * @param {float} b 
 * @returns {float} random number between the input numbers
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
    // let menu = document.getElementById('myMenu');
    // if (getOrientation() == 90 || getOrientation() == -90) {
    //     console.log(getOrientation());
    //     menu.style.display = 'inline';
    //     setNumberOfColumns(menu, '2');
    //     // menu.style.lineHeight = '450px';
    // } else {
    //     menu.style.display = 'initial';
    //     setNumberOfColumns(menu, 'initial');
    //     // menu.style.lineHeight = 'initial';
    // }
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