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
    let mainPage = document.getElementsByClassName('project')[0];
    mainPage.style.width = '100%';
    mainPage.style.height = 'auto';
}
/**
 * stes the position of the divs below the menu bar
 */
function setPositionDivs() {
    document.getElementById("myContainer").style.top = menuHeight() + 10 + 'px';
}
/**
 * this function returns the height of the menu at any time
 */
function menuHeight() {
    return document.getElementById('myMenu').getBoundingClientRect().height;
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

    // icon1.setAttribute("width", "304");
    // icon1.setAttribute("height", "228");
    // icon1.setAttribute("alt", "The Pulpit Rock");
    // document.body.appendChild(icon1);
let menuIsShow = true;
function closeOpenMenu() {
    menuIsShow = !menuIsShow;//every click we change the status of the boolean
    let myTags = document.getElementsByTagName('menuelement');
    for (let i = 0; i < myTags.length; i++) {
        menuIsShow == false ? myTags[i].style.display = 'none' : myTags[i].style.display = 'initial';
    }
    let myMenu = document.getElementById('myMenu');
    menuIsShow == false ? myMenu.style.width = menuHeight() + 'px' : myMenu.style.width = 'auto';
    let button = document.getElementById('openClose');
    // menuIsShow == true ? button.innerHTML = 'Close Menu' : button.innerHTML = 'Show Menu';

    menuIsShow == true ? document.getElementById('menuIcon').src = icon1 : document.getElementById('menuIcon').src = icon2;
}
/**
 * event listener that checks the orientation of devices
 */
// window.addEventListener("orientationchange", function () {
//     let deviceAngle = screen.orientation.angle;
//     if (deviceAngle == 90 || deviceAngle == -90) {
//         let myTags = document.getElementsByTagName('a');
//         for (let i = 0; i < myTags.length; i++) {
//             myTags[i].style.display = 'initial';
//         }
//         document.getElementById('openClose').innerHTML = 'Close Menu';
//         document.getElementById('myMenu').style.width = 'auto';
//     }
//     // alert("the orientation of the device is now " + screen.orientation.angle);
// });
// $(".project").click(function(e){
//     let h = window.innerHeight;
//     console.log(e);
//     // e.target.style.width = '98%';
//     // e.target.style.height = h + 'px';
// });
// /**
//  * testing jQuery functions
//  */
// $( "a" ).click(function () {
//     console.log("jQuery");
// });