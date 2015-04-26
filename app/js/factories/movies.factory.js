angular.module('3play').factory('MoviesFactory', function($http, $q) {
  'use strict';

  var fetch = function() {
    var deferred, movies;
    deferred = $q.defer();
    $http.get('http://localhost:3000/movies')
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
