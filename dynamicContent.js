const url = 'https://arenaapp.herokuapp.com/data';
let json;
$.get(url, data => {
  json = data;
  createContent(data);
});

function createContent(data) {
  console.log(data.contents);
  const contents = data.contents;
  //we go trough all the elements of the json file
  for (let content of contents) {
    let img = imgTag(content.image.large.url);
    let url = content.image.large.url;
    console.lo
    let source = aTag(content.source.url, content.title);
    const myHtml = img + source;
    let divPosition = {
      top: Math.random() * (innerHeight - 400),
      left: Math.random() * (innerWidth - 400)
    }
    let d = document.createElement('div');
    $(d).addClass('inspiration')
      .css("background-image", "url(" + url + ")")
      .html(source)
      .offset(divPosition)
      .appendTo($('#content')) //main div
    // we run the enlarge divs script here so that it happens when the remote content is laoded

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
  let myClass = document.getElementsByClassName('inspiration');
  for(let el of myClass){
    el.style.top = '0px';
    el.style.left = '0px';
    el.style.position = 'relative';
    el.style.float = 'left';
  }

}