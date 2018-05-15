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
let isGrid = false;
let divPosition = [];
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
    //we go trough all the elements of the json file
    let i = 0;
    for (let content of contents) {

      // console.log(content.base_class);
      // here we generate the html text
      // let source = '';
      // let url = '';
      // // let img = imgTag(content.image.large.url);
      // if (content.source != null) {
      //   if (content.image != null) url = content.image.large.url;
      //   source = aTag(content.source.url, content.title);
      // } else {
      //   if (content.image != null) url = content.image.large.url;
      //   source = HTMLtitle(content.title);
      // }
      // const myHtml = img + source;
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
        .html(htmlContent(content))
        .offset(divPosition[i])
        .appendTo($('#dynamicContent')) //main div
      i++;
    }
  }
}
function imgUrl(data) {
  if (data.base_class.startsWith(BLOCK)) {
    if (data.image != null) {
      return data.image.large.url;
    } else {
      return 'img/img_02.jpg';
    }
  } else if (data.base_class.startsWith(CHANNEL)) {
    return data.user.avatar_image.display;
  } else return '';
}

function htmlContent(data) {
  if (data.base_class.startsWith(BLOCK)) {
    if (data.class.startsWith(TEXT)) {
      let link = ARENA_URL + 'block/' + data.id;
      return aTag(link, data.title);
    } else if (data.class.startsWith(MEDIA) || data.class.startsWith(LINK) || data.class.startsWith(IMAGE)) {
      return aTag(data.source.url, data.title);
    } else if (data.class.startsWith(ATTACHMENT)) {
      let link = data.attachment.url;
      return aTag(link, data.title);
    } else return data.title;
  } else if (data.base_class.startsWith(CHANNEL)) {
    let link = ARENA_URL + data.user.slug + '/' + data.slug;
    return aTag(link, data.title);
  } else return 'FAIL';
}

function aTag(link, text) {
  return ' <a href="' + link + '" target="_blank">' + text + '</a>';
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