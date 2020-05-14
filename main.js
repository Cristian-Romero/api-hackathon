var subButt = document.querySelector('button');
var asideEl = document.querySelector('aside');
var articleEl = document.querySelector('article');
var randomPage = Math.floor(Math.random() * 500) + 1;
var randomMovieFromPage = Math.floor(Math.random() * 19) + 1;

subButt.addEventListener('click', getGenreValue);

//Get movies by genre
function getGenreValue(event) {
  var dropDown = document.getElementById('genreOptions');
  var genreID = dropDown.options[dropDown.selectedIndex].value;
  event.preventDefault();

  $.ajax({
    method: "GET",
    url: "https://api.themoviedb.org/3/discover/movie?api_key=" + tmdbKey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&region=US&page=" + randomPage + "&with_genres=" + genreID,
    success: function(data) {
      getMovieInfo(data);
    },
    error: function(error) {
      console.error(error);
    }
  })
}

//Get movie title, release date, plot and poster
function getMovieInfo(data) {
  console.log(data);
  console.log(data.results);

  var movieInfoResults = data.results[randomMovieFromPage];
  console.log(movieInfoResults);
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
  console.log(data);
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
  var movieTrailerKey = movieTrailer[0].key;
  console.log(movieTrailer);
  console.log(movieTrailer.length);
  if (movieTrailer.length === 0) {
    var noMovieTrailer = document.createElement('p');
    noMovieTrailer.textContent = "Sorry! There's no movie trailer!";
    articleEl.append(noMovieTrailer);
  } else {
    var showMovieTrailer = document.createElement('iframe');
    showMovieTrailer.src = "https://www.youtube.com/embed/" + movieTrailerKey;
    articleEl.append(showMovieTrailer);
  }
}
