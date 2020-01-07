
/*************************************
 * constant of pixel ratio of device *
 *************************************/
const pix = window.devicePixelRatio;
/***********************************/

const converter = new showdown.Converter();

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
 * @param {HTMLObjectElement} el - the section that needs to be shown! 
 */
function reveal(el) {
  // window.scrollTo(0, 0);
  document.querySelector('div.main').scrollTo(0, 0);
  console.log(el.dataset.section);
  const section = el.dataset.section
  const articles = document.getElementById('articles').children;
  let i = 0;
  for (const child of articles) {
    if (child.dataset.section === section) child.style.display = 'grid';
    else child.style.display = 'none';
    i++
  }
  console.log(i);
  hide_inspiration();
}

function reveal_inspiration(el) {
  if (el !== undefined) reveal(el);

  const inspiration = document.getElementById('inspiration')
  // if(inspiration.style.display === 'none'){
  inspiration.style.display = 'block'
  // }
}

function hide_inspiration() {
  const inspiration = document.getElementById('inspiration')
  if (inspiration.style.display === 'block') {
    inspiration.style.display = 'none'
  }
}
/**
 * function that shows all the posts of the wesite
 */
function showAll() {
  document.querySelector('div.main').scrollTo(0, 0);
  const articles = document.getElementById('articles').children;
  for (const child of articles) child.style.display = 'grid';
  reveal_inspiration();
}

let content;
let start_content = 0;
let end_content = 5;

const content_range = 5;


function initialize_content() {

  $.getJSON('content.json', data => {
    // console.log(data);
    data = convert_data(data).sort((a, b) => b.date - a.date);
    // console.log(data);
    render_content(data);
  });
}
initialize_content();

function convert_data(arr) {
  const result = arr;
  for (const el of result) {
    // console.log(el.date);
    const date = el.date.split('/');
    const month = parseInt(date[0]);
    const year = parseInt(date[1]);
    const parsed_date = new Date(year, month, 1);
    el.date = parsed_date;
  }
  return result;
}

let g_data;
function render_content(data) {

  // if the url is a link to a specific post we render it opened

  // get referrer
  // console.log(window.location);
  let hash = window.location.hash
  if (hash) {
    console.log(hash);
    hash = hash.replace('#', '');
    console.log(hash);
    // const div_to_enlarge = document.getElementById(hash);
    // // we enlarge the div
    // enlargeDivs(div_to_enlarge);
    // const article = data.filter(result => result.id === hash);
    // console.log(article[0]);
  }

  for (const el of data) {
    // const el = content[i];
    // console.log(i);
    // create asrticle element
    const article = document.createElement('div');
    article.setAttribute('class', 'preview copy');
    article.setAttribute('id', el.id);
    // add data: date, section && link
    const month = el.date.getMonth() + 1;
    const year = el.date.getFullYear();
    article.setAttribute('data-date', month + '/' + year);
    article.setAttribute('data-section', el.section);
    const link_to_div = window.location.origin + '/index.html#' + el.id;
    article.setAttribute('data-clipboard-text', link_to_div)
    const image_url = el.img_list[0] || 'img/commoning_web.png'
    article.style.backgroundImage = 'url(' + image_url + ')';
    if (el.section === 'german') article.style.display = 'none';
    const title = document.createElement('div');
    title.innerText = el.title;
    title.setAttribute('class', 'title-content');
    article.appendChild(title);

    const txt = document.createElement('div');
    txt.setAttribute('class', 'text-content');
    const p = document.createElement('p');
    const MD_to_html = converter.makeHtml(el.content);
    // console.log(MD_to_html);
    p.innerHTML = MD_to_html;
    txt.appendChild(p);
    // article.appendChild(txt);

    const media_content = document.createElement('div');
    media_content.setAttribute('class', 'media-content');

    for (const url of el.video_list) {
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
    }
    // article.appendChild(media_content);
    // set random width to div;
    // if (innerWidth > 899) {
    //   const random_w = (2 + Math.floor(Math.random() * 3)) * 10;
    //   article.style.width = random_w + '%';
    // }
    const main = document.getElementById('articles');


    article.addEventListener('click', () => enlargeDivs(article))
    article.appendChild(media_content)
    article.appendChild(txt)
    main.appendChild(article);
    if (hash === el.id) {
      // console.log(article);
      enlargeDivs(article);
      // const $media = $(media_content);
      // const $content = $(txt);
      // const container = article;
      // $(container).append($media);
      // $(container).append($content);
    } else {
      // $(article).click(enlargeDivs);
      // $(article).click((el) => {
      //   // console.log($(this));
      //   const $media = $(media_content);
      //   const $content = $(txt);
      //   const container = article;
      //   $(container).append($media);
      //   $(container).append($content);
      // })
    }
  }

}


/**
 * this function enlarges the divs by clicking on them
*/
let previous = null, prevH, prevW, prev;
function enlargeDivs(el) {
  let scroll_to = true;
  let my_div = el;
  // if (el) { // this is a work around to detect whether the el is a dom element or a jquery object
  //   my_div = el.target;
  // } else {
  //   my_div = el;
  //   scroll_to = true;
  // }
  // console.log(my_div);
  if (previous === null) {
    // continue;
    //needs refactoring!!!!!!!
  } else {
    //reset the previous clicked div to its initial state
    previous.setAttribute('class', 'preview copy');
    previous.querySelector('.media-content').style.display = 'none'
    previous.querySelector('.text-content').style.display = 'none'
  }
  //let's save the div so we can reset it later
  previous = my_div;
  my_div.setAttribute('class', 'enlarged copy');
  console.log(my_div);
  for (const child of my_div.children) {
    child.style.display = 'block'
  }
  my_div.style.backgroundImage = 'none';
  const main = document.querySelector('div.main')
  if (scroll_to) {//here we get the height of the top menu (needs refactoring set it as gloal variable)
    const y = parseFloat(my_div.getBoundingClientRect().y) + main.scrollTop - 100; //this helps us to get the position of the div to scroll to
    console.log(document.querySelector('div.main').scrollTop, y)
    main.scrollTop = y;
  } else {
    // console.log(my_div.getBoundingClientRect());
    // console.log(main.scrollTop);
    // main.scrollTop = my_div.getBoundingClientRect().y - 600;
    // const val = my_div.getBoundingClientRect().y - 600
    // console.log(val);
    // main.scrollTo(0, val);
    // console.log(main.scrollTop);
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
  let myTags = document.getElementsByClassName('menuelement');
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