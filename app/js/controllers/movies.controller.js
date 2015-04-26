angular.module('3play').controller('MovieCtrl', function($scope, $http, MoviesFactory) {
  'use strict'

  var promise, clearMovieForm;

  promise = MoviesFactory.fetch();
  promise.then(function(movies) {
    var movieObject, i, movieTitleCleaned;
    movieObject = {};
    for (i=0; i < movies.length; i++) {
      movieTitleCleaned = movies[i].title.toLowerCase().replace(/ /g, "").replace(/'/g,"");
      movieObject[movieTitleCleaned] = movies[i].id;
    };
    $scope.movies = movieObject;
  });

  clearMovieForm = function() {
    // this removes the title from the scope but does not remove it from the page
    $scope.movieTitle = {};
  }

  $scope.enterMovie = function(data) {
    var cleanedData, movieSearchId;
    cleanedData = data.toLowerCase().replace(/ /g, "").replace(/'/g,"");
    movieSearchId = $scope.movies[cleanedData];
    if (movieSearchId === undefined) {
      alert("Oops! It looks like you've either mispelled the movie or we dont have the movie :( Please try again!")
    } else {
      $http.get('http://localhost:3000/movies/'+movieSearchId).success(function(response) {
        console.log(response);
      }).error(function(response){
        alert(response);
      });
    }
    // clearMovieForm();
  };



});
