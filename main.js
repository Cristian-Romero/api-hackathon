var subButt = document.querySelector('button');
var asideEl = document.querySelector('aside');
var articleEl = document.querySelector('article');
var randomPage = Math.floor(Math.random() * 500) + 1;
var randomMovieFromPage = Math.floor(Math.random() * 19) + 1;
var selectEl = document.getElementById("genreOptions");

selectEl.onchange = noSubmitButton;
window.onload = noSubmitButton;

subButt.addEventListener("click", getGenreValue);

function noSubmitButton() {
  var genreSelected = selectEl.options[selectEl.selectedIndex].value;
  console.log(genreSelected);
  if (genreSelected === "None") {
    subButt.disabled = true;
    console.log(genreSelected);
    console.log("Cannot hit the button!");
  } else {
    console.log("Can hit the button!");
    subButt.disabled = false;
  }
}

//Get movies by genre
function getGenreValue(event) {
  var dropDown = document.getElementById('genreOptions');
  var genreID = dropDown.options[dropDown.selectedIndex].value;
  event.preventDefault();

  $.ajax({
    method: "GET",
    url: "https://api.themoviedb.org/3/discover/movie?api_key=" + tmdbKey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&region=US&page=" + randomPage + "&with_genres=" + genreID,
    success: getMovieInfo,
    error: console.error()
  })
  subButt.disabled = true;
}

//Get movie title, release date, plot and poster
function getMovieInfo(data) {
  var movieInfoResults = data.results[randomMovieFromPage];
  var randomMovieId = movieInfoResults.id;
  if (movieInfoResults.poster_path === null) {
    var noMoviePoster = document.createElement('p');
    noMoviePoster.textContent = 'Sorry, there is no poster for this movie';
    asideEl.append(noMoviePoster);
  } else {
    var moviePoster = "http://image.tmdb.org/t/p/w342" + movieInfoResults.poster_path;
    var showMoviePoster = document.createElement('img');
    showMoviePoster.src = moviePoster;
    showMoviePoster.classList.add('movie-poster-border');
    asideEl.append(showMoviePoster);
  }

  var showMovieTitle = document.createElement('p');
  var showMoviePlot = document.createElement('p');
  var showMovieReleaseDate = document.createElement('p');

  showMovieTitle.textContent = movieInfoResults.title;
  showMoviePlot.textContent = movieInfoResults.overview;
  showMovieReleaseDate.textContent = movieInfoResults.release_date;

  articleEl.append(showMovieTitle, showMovieReleaseDate, showMoviePlot);

  getRatings(movieInfoResults.title);
  getTrailerInfo(randomMovieId);
}

//Get imdb Rating
function getRatings(movieName) {
  $.ajax({
    method: "GET",
    url: "http://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + movieName,
    success: function(data) {
      getImdbRating(data);
    },
    error: function(error) {
      console.error(error);
    }
  })
}

function getImdbRating(data) {
  var imdbRating = data.Ratings[0];

  var ratingsHeader = document.createElement('h4');
  var showMovieRating = document.createElement('p');

  ratingsHeader.textContent = 'Movie Ratings';
  showMovieRating.textContent = imdbRating.Source + ': ' + imdbRating.Value;

  articleEl.append(ratingsHeader ,showMovieRating);
}


// Create section for movie trailer
function getTrailerInfo(movieID) {
  $.ajax({
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/" + movieID + "/videos?api_key=" + tmdbKey,
    success: function(data) {
      moviePreview(data);
    },
    error: function(error) {
      console.error(error);
    }
  })
}

function moviePreview(data) {
  var movieTrailer = data.results;
  if (!movieTrailer.length) {
    var noTrailer = document.createElement('p');
    noTrailer.textContent = "Sorry! There's no movie trailer!";
    articleEl.append(noTrailer);
  } else {
    var movieTrailerKey = movieTrailer[0].key;
    var showMovieTrailer = document.createElement('iframe');
    showMovieTrailer.src = "https://www.youtube.com/embed/" + movieTrailerKey;
    articleEl.append(showMovieTrailer);
  }
}
