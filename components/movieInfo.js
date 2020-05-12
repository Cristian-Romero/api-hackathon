class movieInfo {
  constructor() {
    this.handleGetMovieSuccess = this.handleGetMovieSuccess.bind(this);
    this.handleGetMovieError = this.handleGetMovieError.bind(this);
  }

  startMovie() {
    this.getMovie();
  }

  getMovie() {
    $.ajax({
      method: "GET",
      url: "http://www.omdbapi.com/?i=tt3896198&apikey=" + omdbKey + "&type=comdey",
      success: this.handleGetMovieSuccess,
      error: this.handleGetMovieError,
    })
  }

  handleGetMovieSuccess(success) {
    console.log('Success!', success);
  }

  handleGetMovieError(error) {
    console.error(error);
  }

}
