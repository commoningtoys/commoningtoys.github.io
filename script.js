/*************************************
 * constant of pixel ratio of device *
 *************************************/
const pix = window.devicePixelRatio;
/***********************************/


let myClasses = ['team', 'project', 'process', 'inspiration', 'german', 'output'];
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
        thisClass[j].style.display = 'grid';
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
      thisClass[j].style.display = 'grid';
    }
  }
}

function initialize_content() {

  $.getJSON('content.json', data => {
    console.log(data);
    convert_date(data)
    console.log(data);
    process_data(data)
  });
}


function convert_date(arr) {
  for (const el of arr) {
    console.log(el.date);
    const date = el.date.split('/');
    const month = parseInt(date[0]);
    const year = parseInt(date[1]);
    const parsed_date = new Date(year, month, 1);
    el.date = parsed_date;
  }
}
let sorted_data;
let load_interval
let load_index = 0;
function process_data(data) {
  sorted_data = data.sort((a, b) => a.date - b.date);
  for (const el of sorted_data) {
    const article = document.createElement('div');
    // article.innerHTML = el.content
    article.setAttribute('class', el.section);
    article.setAttribute('id', el.id);

    const title = document.createElement('div');
    title.innerText = el.title;
    title.setAttribute('class', 'title-content');

    article.appendChild(title);

    const txt = document.createElement('div');
    txt.innerHTML = el.content;
    txt.setAttribute('class', 'text-content');

    article.appendChild(txt);

    const media_content = document.createElement('div');
    media_content.setAttribute('class', 'media-content');

    for (const url of el.video_list) {
      // const words = url.split('/');
      // const id = words[words.length - 1];
      // console.log(id)
      // $.getJSON(`https://api.vimeo.com/videos/${id}/pictures`, data => console.log(data))
      // $.ajax({
      //   "url": `https://api.vimeo.com/videos/${id}/pictures`,
      //   success: data => console.log(data)

      // })
      const my_iframe = document.createElement('iframe');
      my_iframe.setAttribute('src', url);
      my_iframe.setAttribute('frameborder', '0');
      my_iframe.setAttribute('width', '100%');
      my_iframe.setAttribute('height', 'auto');
      media_content.appendChild(my_iframe);
    }

    for (const url of el.img_list) {
      const my_img = document.createElement('img');
      my_img.setAttribute('src', url);
      media_content.appendChild(my_img);
    };

    article.appendChild(media_content);
    // set random width to div;
    if (innerWidth > 899) {
      const random_w = (3 + Math.floor(Math.random() * 5)) * 10;
      article.style.width = random_w + '%';
    }
    const inspiration = document.getElementById('inspiration');
    const main = document.getElementById('articles');
    main.insertBefore(article, inspiration);
  }

  enlargeDivs();
}

/**
 * this function initializes the width and heights of all the divs
 * DEPRECATED WILL BE REMOVED
 */
function init() {
  for (let i = 0; i < myClasses.length; i++) {
    let thisClass = document.getElementsByClassName(myClasses[i]);
    for (let j = 0; j < thisClass.length; j++) {
      //set random with and height for all classes except inspiration
      if (!myClasses[i].includes('inspiration')) {
        let randW = Random(20, 60);
        thisClass[j].style.width = Math.floor(randW) + '%';
        let randH = thisClass[j].style.width;
        thisClass[j].style.height = Math.floor(randH) + 'px';
      }
    }
  }
  //set the first div project to width 100%
  //needs refactoring
  let mainPage = document.getElementById('mainPage');
  mainPage.style.width = '95%';
  mainPage.style.height = 'auto';
  if (screen.width > 899) setNumberOfColumns(mainPage, '2');
  else setNumberOfColumns(mainPage, 'initial');
}
/**
 * stes the position of the divs below the menu bar
 */
function setPositionContainer() {
  // let container = document.getElementById('myContainer');
  // //here we set the header image near the menu button when on device
  // let menu = BoundsById('menuIcon');
  // let headerDiv = BoundsById('myHeader');

  // if (screen.width < 899) {
  //   let w = screen.width - menu.width;
  //   let headerImg = document.getElementById('myHeader');
  //   headerImg.style.width = w + 'px';
  //   headerImg.style.left = menu.width + 'px';
  // }
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
  $('.project, .process, .output, .german').click(function () {
    let myDiv = this;
    if (previous == null) {
      // continue;
      //needs refactoring!!!!!!!
    } else {
      //reset the previous clicked div to its initial state
      // setNumberOfColumns(previous, 'initial');
      previous.style.height = prevH;
      previous.style.width = prevW;
      previous.style.overflowY = 'scroll';
    }
    //let's save the div so we can reset it later
    previous = this;
    prevH = this.style.height;
    prevW = this.style.width;
    //here we enlarge the div
    // myDiv.style.overflowY = 'hidden';
    myDiv.style.width = '95%';
    myDiv.style.height = 'auto';
    myDiv.style.maxHeight = '650px';
    // myDiv.style.
    //the insoiration div should be come as high as the page
    // if (myDiv.className.includes('inspiration')) myDiv.style.height = '100vh';
    // console.log(myDiv.className.includes('inspiration'));
    //here we set the number of columns
    // if (screen.width > 899 && !myDiv.className.includes('inspiration')) setNumberOfColumns(myDiv, '2');
    //here we get the height of the top menu (needs refactoring set it as gloal variable)
    const y = parseFloat(this.getBoundingClientRect().y) + document.getElementById('articles').scrollTop - 100; //this helps us to get the position of the div to scroll to
    // window.scrollTo(0, 50);
    document.getElementById('articles').scrollTop = y;
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