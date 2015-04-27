angular.module('3play').controller('MovieCtrl', function($scope, $http, $location, MoviesFactory) {
  'use strict'

  var promise, clearMovieForm, addDragtoNames;

  promise = MoviesFactory.fetch();
  promise.then(function(movies) {
    var movieObject, i, movieTitleCleaned;
    movieObject = {};
    for (i=0; i < movies.length; i++) {
      movieTitleCleaned = movies[i].title.toLowerCase().replace(/ /g, "").replace(/'/g,"");
      movieObject[movieTitleCleaned] = movies[i].id;
    };
    $scope.movies = movieObject;
    $('#draggable').draggable();

  });

  clearMovieForm = function() {
    // this removes the title from the scope but does not remove it from the page
    $scope.movieTitle = {};
  }

  addDragtoNames = function() {
    var data, i;
    data = $scope.actors.actors;
    for(i=0; i<data.length; i++) {
      // debugger
      $("#"+data[i].id).draggable();
    }
  };

  $scope.enterMovie = function(data) {
    var cleanedData, movieSearchId, promise;
    cleanedData = data.toLowerCase().replace(/ /g, "").replace(/'/g,"");
    movieSearchId = $scope.movies[cleanedData];
    if (movieSearchId === undefined) {
      alert("Oops! It looks like you've either mispelled the movie or we dont have the movie :( Please try again!")
    } else {
      promise = $http.get('http://localhost:3000/movies/'+movieSearchId).success(function(response) {
        console.log(response);
        $scope.actors = response;
      }).error(function(response){
        alert(response);
      });
      promise.then(function() {
        $('#entry-screen').hide("slow");
        $('#game-screen').show("slow");
        $('#dragMe').on('mouseover','.namesToDrag', function(){
          $(this).draggable();
        });
        // addDragtoNames();
        // debugger
        // $('#dragMe').find $(".namesToDrag").draggable();
      });
    }
    // clearMovieForm();
  };

  // $(function() {
    // $( ".draggable" ).draggable();
  //   $( "#droppable" ).droppable({
  //     drop: function( event, ui ) {
  //       $( this )
  //         .addClass( "ui-state-highlight" )
  //         .find( "p" )
  //           .html( "Dropped!" );
  //     }
  //   });
  // });



});
