angular.module('3play').controller('MovieCtrl', function($scope, $http, MoviesFactory) {
  'use strict'
  debugger
  var promise;

  promise = MoviesFactory.fetch();
  promise.then(function(movies) {
    $scope.movies = movies
    debugger
  });
  debugger


});
