var subButt = document.querySelector('button');
var randomPage = Math.floor(Math.random() * 500) + 1;
var randomMovieFromPage = Math.floor(Math.random() * 20) + 1;

subButt.addEventListener('click', getGenreValue);

function getGenreValue(event) {
  var dropDown = document.getElementById('genreOptions');
  var genreID = dropDown.options[dropDown.selectedIndex].value;
  event.preventDefault();

  $.ajax({
    method: "GET",
    url: "https://api.themoviedb.org/3/discover/movie?api_key=" + tmdbKey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + randomPage + "&with_genres=" + genreID,
    success: handleGetSuccess,
    error:handleGetError
  })
}

function handleGetSuccess(success) {
  console.log(success);
}

function handleGetError(error) {
  console.error(error);
}
