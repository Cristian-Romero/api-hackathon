var subButt = document.querySelector('button');
var asideEl = document.querySelector('aside');
var articleEl = document.querySelector('article');
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
    success: function(data) {
      getMovieInfo(data);
    },
    error: function(error) {
      console.error(error);
    }
  })
}

function getMovieInfo(data) {
  console.log(data.results);
  var movieInfoResults = data.results[randomMovieFromPage];
  console.log(movieInfoResults);
  var moviePoster = "http://image.tmdb.org/t/p/w185/" + movieInfoResults.poster_path;

  var showMovieTitle = document.createElement('p');
  var showMoviePlot = document.createElement('p');
  var showMovieReleaseDate = document.createElement('p');
  var showMoviePoster = document.createElement('img');

  showMovieTitle.textContent = movieInfoResults.title;
  showMoviePlot.textContent = movieInfoResults.overview;
  showMovieReleaseDate.textContent = movieInfoResults.release_date;
  showMoviePoster.src = moviePoster;

  asideEl.append(showMoviePoster);
  articleEl.append(showMovieTitle, showMovieReleaseDate, showMoviePlot);
}
