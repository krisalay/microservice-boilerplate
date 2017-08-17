function fetchMovies(call, callback) {
  console.log('@@@@@@@@@@@@@@ fetchMovies');
  callback(null, {fetched: true})
}

module.exports = {
  fetchMovies
};
