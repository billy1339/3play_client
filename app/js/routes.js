angular.module('3play').config(function($routeProvider) {
  'use strict';
  $routeProvider
    .when('/', {
      templateUrl: 'app/templates/home.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
