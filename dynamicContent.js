const url = 'https://arenaapp.herokuapp.com/data';
let json; 
$.get(url, data => {
    json = data;
    createContent(data);
  });

  function createContent(data){
     console.log(data.contents);
  }