angular.module('3play').controller('MovieCtrl', function($scope, $http, MoviesFactory) {
  'use strict'

  var promise;

  promise = MoviesFactory.fetch();
  promise.then(function(movies) {
    var movieObject, i, movieTitleCleaned;
    movieObject = {};
    for (i=0; i < movies.length; i++) {
      movieTitleCleaned = movies[i].title.toLowerCase().replace(/ /g, "").replace(/'/g,"");
      movieObject[movieTitleCleaned] = movies[i].id;
    };
    $scope.movies = movieObject;
    debugger
  });



});
