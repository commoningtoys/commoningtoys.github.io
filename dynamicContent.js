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
    let title = h1Tag(content.title);
    let img = imgTag(content.image.display.url);
    let source = aTag(content.source.url);
    const myHtml = title + img + source;
    let d = document.createElement('div');
    $(d).addClass('inspiration')
      .html(myHtml)
      .appendTo($('#myContainer')) //main div
      // we run the enlarge divs script here so that it happens when the remote content is laoded
      enlargeDivs();
  }
}

function aTag(str) {
  return ' <a href="facebook.com">Link to Source</a>';
}

function imgTag(str) {
  return ' <img src="' + str + '">';
}

function h1Tag(str) {
  return ' <h1>' + str + '</h1>';
}