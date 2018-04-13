const url = 'https://arenanodeapp.herokuapp.com/data';
let json;
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
  for (let content of contents) {
    // here we generate the html text
    let img = imgTag(content.image.large.url);
    let url = content.image.large.url;
    let source = aTag(content.source.url, content.title);
    const myHtml = img + source;
    // here we get the bounds of the container div
    // and we set the position of the div randomly
    let containerBounds = BoundsById('myContainer');
    let divPosition = {
      top: (Math.random() * (containerBounds.height - 400)),
      left: (Math.random() * (containerBounds.width - 400))
    }
    //here we generate the div and we attach html and position to it
    let d = document.createElement('div');
    $(d).addClass('inspirationContent')
      .css("background-image", "url(" + url + ")")
      .html(source)
      .offset(divPosition)
      .appendTo($('#dynamicContent')) //main div

  }
}

function aTag(link, text) {
  return ' <a href="' + link + '">' + text + '</a>';
}

function imgTag(str) {
  return ' <img src="' + str + '">';
}

function grid() {
  let content = document.getElementById('content');
  // content.style.position = 'relative';
  // content.style.float = 'left';
  let myClass = document.getElementsByClassName('inspirationContent');
  for(let el of myClass){
    el.style.top = '0px';
    el.style.left = '0px';
    el.style.position = 'relative';
    el.style.float = 'left';
  }
}