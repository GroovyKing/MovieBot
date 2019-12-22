function getMovie() {
  wipe()
  var page = Math.floor(1 + (Math.random() * 61));
  var movieNum = Math.floor(Math.random() * 20);
  var movieurl = "https://api.themoviedb.org/3/discover/movie?api_key=d1c26309ea9bbe00b09f2f24f3d9518c&language=en-US&certification_country=US&certification.lte=PG-13&certification.gte=G&include_adult=false&include_video=false&page=" + page + "&vote_count.gte=1000";
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": movieurl,
    "method": "GET",
    "headers": {},
    "data": "{}"
  }
  $.ajax(settings).done(function (response) {
    var id = response.results[movieNum];
    createList(id);
  });
}
function createList(id) {
  $('#rclist').remove();
  var movieAddress = "https://api.themoviedb.org/3/movie/" + id.id + "/images?api_key=d1c26309ea9bbe00b09f2f24f3d9518c";
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": movieAddress,
    "method": "GET",
    "headers": {},
    "data": "{}"
  }
  $.ajax(settings).done(function (response) {
    var endpoints = response.backdrops;
    document.getElementById("title").innerHTML = id.title;
    document.getElementById("desc").innerHTML = id.overview;
    for (i = 0; i < 12; i++) {
      var listItem = document.getElementById("img"+i);
      listItem.onclick = function () {
        add(this.src);
      };
      listItem.src = 'http://image.tmdb.org/t/p/w300' + response.backdrops[i].file_path;
    }
  });
}
function add(url) {
  let listContainer = document.createElement('div'),
    listElement = document.createElement('ul'),
    listItem;
  document.getElementsByTagName('body')[0].appendChild(listContainer);
  listContainer.appendChild(listElement);
  listContainer.id = "rclist";
  listItem = document.createElement('h4');
  listItem.innerHTML = "![ ](" + url + ")";
  listElement.appendChild(listItem);
}
function wipe(){
  for(i=0;i<12;i++){
    var listItem = document.getElementById("img"+i);
    listItem.src = '';
  }
}