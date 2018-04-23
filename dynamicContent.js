const url = 'https://arenanodeapp.herokuapp.com/data';
let json;
let isGrid = false;
let divPosition = [];
$.get(url, data => {
  json = data;
  createContent(data);
});
/**
 * this function creates the dynamic content
 * @param {JSON} data JSON file 
 */
function createContent(data) {
  // console.log(data.contents);
  const contents = data.contents;
  //we go trough all the elements of the json file
  let i = 0;
  for (let content of contents) {
    // here we generate the html text
    let img = imgTag(content.image.large.url);
    let url = content.image.large.url;
    let source = aTag(content.source.url, content.title);
    const myHtml = img + source;
    // here we get the bounds of the container div
    // and we set the position of the div randomly
    let containerBounds = BoundsById('myContainer');
    divPosition[i] = {
      top: (Math.random() * (containerBounds.height - 400)),
      left: (Math.random() * (containerBounds.width - 400))
    }
    //here we generate the div and we attach html and position to it
    let d = document.createElement('div');
    $(d).addClass('inspirationContent')
      .css("background-image", "url(" + url + ")")
      .html(source)
      .offset(divPosition[i])
      .appendTo($('#dynamicContent')) //main div
    i++;
  }
}

function aTag(link, text) {
  return ' <a href="' + link + '" target="_blank">' + text + '</a>';
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
      el.style.top = containerBounds.top + divPosition[i].top + 'px';
      el.style.left = containerBounds.left + divPosition[i].left + 'px';
      el.style.position = 'fixed';
      el.style.float = 'none';
      i++;
    }
  }
  isGrid = !isGrid;
  
}