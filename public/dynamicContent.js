const URL = 'https://arenanodeapp.herokuapp.com/data';
// const url = 'http://localhost:5000/data';
const ARENA_URL = 'https://are.na/';
/**CONST to navigate the different part of the arean JSON**/
const BLOCK = 'Block';
const CHANNEL = 'Channel';
const MEDIA = 'Media';
const LINK = 'Link';
const ATTACHMENT = 'Attachment';
const IMAGE = 'Image';
const TEXT = 'Text';
/*************************************/
let json;
let isGrid = true;
let divPosition = [];
// let arena_index = 0;
  $.get(URL, data => {
    json = data;
    createContent(data);
  });
/**
 * this function creates the dynamic content
 * @param {Array} data Array of JSON files 
 */
function createContent(data) {
  console.log(data);
  for (const channel of data) {
    const contents = channel.contents;
    const COLOR  = createColor();
    //sort the content by date
    contents.sort((a, b) => {
      let dateA = new Date(a.created_at), dateB = new Date(b.created_at);
      // console.log(dateA, dateB);
      return dateB - dateA;
    });
    // console.log(contents.created_at);
    //we go trough all the elements of the json file
    let i = 0;
    for (let content of contents) {
      // here we get the bounds of the container div
      // and we set the position of the div randomly
      let containerBounds = BoundsById('myContainer');
      divPosition.push({
        top: (Math.random() * (containerBounds.height - 400)),
        left: (Math.random() * (containerBounds.width - 400))
      });
      //here we generate the div and we attach html and position to it
      let d = document.createElement('div');
      $(d).addClass('inspirationContent')
        .css("background-image", "url(" + imgUrl(content) + ")")//" /*+ url + */"
        .css("background-color", COLOR)
        .html(htmlContent(content))
        // .offset(divPosition[i])
        .appendTo($('#dynamicContent')) //main div
      i++;
    }
  }
}
/**
 * this function returns the link to an image 
 * it handles various exception putting a plceholder 
 * image in the case the JSON doesn't provides a link to one
 * @param {JSON} data JSON file with the data
 * @returns the link to an image
 */
function imgUrl(data) {
  // first we check if it is a 'Block' content or 'Channel'
  if (data.base_class.startsWith(BLOCK)) {
    // does i have an image
    if (data.image != null) {
      return data.image.thumb.url;//if yes we return the link
    } else {
      return 'img/no.png';// otherwise a placeholder image
    }
  } else if (data.base_class.startsWith(CHANNEL)) {
    // in the case of a channel we return the user avatar image
    return data.user.avatar_image.thumb;
  } else return 'img/no.png';// if it is none of the above we put a placeholder image
}


/**
 * this function returns the link the source of the arena content
 * it handles various exception 
 * @param {JSON} data JSON file with the data
 * @returns HTML <a> tag with link to the source 
 */
function htmlContent(data) {
  // first we check if it is a 'Block' content or 'Channel'
  if (data.base_class.startsWith(BLOCK)) {
    if (data.class.startsWith(TEXT)) {
      // Text content should link to the arena original page
      let link = ARENA_URL + 'block/' + data.id;
      return aTag(link, data.title);
    } else if (data.class.startsWith(MEDIA) || data.class.startsWith(LINK) || data.class.startsWith(IMAGE)) {
      // Media, Link and Image can be handled the same way
      // returning the source url
      return aTag(data.source.url, data.title);
    } else if (data.class.startsWith(ATTACHMENT)) {
      // Link needs to return the attachment link (amazon link)
      let link = data.attachment.url;
      return aTag(link, data.title);
    } else return data.title;
  } else if (data.base_class.startsWith(CHANNEL)) {
    // Channel returns the url of the original channel
    let link = ARENA_URL + data.user.slug + '/' + data.slug;
    return aTag(link, data.title);
  } else return 'FAIL';
}

function aTag(link, text) {
  const d = document.createElement('div')
  d.setAttribute('class', 'content')
  const a = document.createElement('a')
  a.setAttribute('href', link);
  a.innerText = text;
  d.appendChild(a);
  return d
  // console.log(a);
  // return ' <a href="' + link + '" target="_blank">' + text + '</a>';
}
function HTMLtitle(title) {
  return '<a>' + title + '</a>';
}
function imgTag(str) {
  return ' <img src="' + str + '">';
}

function grid() {
  let content = document.getElementById('content');
  let myClass = document.getElementsByClassName('inspirationContent');
  let temp = myClass;
  // console.log(temp);
  let i = 0;
  if (!isGrid) {
    for (let el of myClass) {
      el.style.top = '0px';
      el.style.left = '0px';
      el.style.position = 'relative';
      el.style.float = 'left';
    }
  } else {
    for (let el of myClass) {
      let containerBounds = BoundsById('myContainer');
      el.style.top = divPosition[i].top + 'px';
      el.style.left = divPosition[i].left + 'px';
      el.style.position = 'absolute';
      el.style.float = 'none';
      i++;
    }
  }
  isGrid = !isGrid;

}

function createColor(){
  let r = Math.floor((Math.random() * 2.55) * 100);
  let g = Math.floor((Math.random() * 2.55) * 100);
  let b = Math.floor((Math.random() * 2.55) * 100);
  return "rgba(" + r + "," + g + ", " + b + ", "+ 0.7 + ")";
}