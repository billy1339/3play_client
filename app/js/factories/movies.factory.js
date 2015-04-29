angular.module('3play').factory('MoviesFactory', function($http, $q) {
  'use strict';

  var fetch = function() {
    $('#game-screen').hide();
    $('#movieList').hide();
    var deferred, movies;
    deferred = $q.defer();
    $http.get('https://limitless-brook-2020.herokuapp.com/movies')
      .success(function(response) {
        movies = [];
        angular.copy(response, movies);
        deferred.resolve(movies);
      });

    return deferred.promise;
  };

  return {
    fetch: fetch
  };

});
