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
    $scope.gameScore = [];
    $('#draggable').draggable();

  });

  clearMovieForm = function() {
    // this removes the title from the scope but does not remove it from the page
    $scope.movieTitle = undefined;
  }


  $scope.enterMovie = function(data) {
    var cleanedData, movieSearchId, promise, array, array1;
    cleanedData = data.toLowerCase().replace(/ /g, "").replace(/'/g,"");
    movieSearchId = $scope.movies[cleanedData];
    if (movieSearchId === undefined) {
      alert("Oops! It looks like you've either mispelled the movie or we dont have the movie :( Please try again!")
    } else {
      promise = $http.get('https://limitless-brook-2020.herokuapp.com/movies/'+movieSearchId).success(function(response) {
        console.log(response);
        $scope.movieTitle = response.title;
        $scope.actors = shuffleArray(response.actors.slice(0));
        $scope.pictures = shuffleArray(response.actors);
      }).error(function(response){
        alert(response);
      });
      promise.then(function() {
        $('#entry-screen').hide("slow");
        $('#game-screen').show("slow");
        $('#dragMe').on('mouseover','.namesToDrag', function(){
          $(this).draggable({
            revert: "invalid"
          });
        });
        $('#dropMe').on('mouseover', 'img', function() {
          $(this).droppable({
            hoverClass: "highlight",
            greedy: true,
             drop: function (ui, event) {
              // $(this).addClass('highlight');
              $(this).addClass($(ui.draggable).attr('highlight'));
              var picture = ui.target.getAttribute('data-id');
              var name = ui.toElement.id;
              calcScore(picture, name);
              $('#'+ui.toElement.id).draggable({
                disabled: true
              });
            }
          })
        });
      });
    }
  };

  var calcScore = function(picture, name ) {
    if (picture === name) {
      $scope.gameScore.push(true);
    }
  }

  $scope.getScore = function() {
    $('.gameScore').removeClass('green');
    $('.gameScore').removeClass('red');
    $('.gameScore').removeClass('orange')
    var length = $scope.gameScore.length;
    if (length === 5) {
      $scope.celebration = "Yay! Great Job! You got the matches all right!";
      $('.gameScore').addClass('green');
    } else if (length === 4) {
      $scope.celebration = "Well Done!";
      $('.gameScore').addClass('green');
    } else if (length === 3) {
      $scope.celebration = "Not bad. You should play again!";
      $('.gameScore').addClass('orange');
    } else if (length === 2) {
      $scope.celebration = "Not your best effort, try again";
      $('.gameScore').addClass('orange');
    } else if (length === 1) {
      $scope.celebration = "Well, one right is better than none.";
      $('.gameScore').addClass('red');
    } else {
      $scope.celebration = "Poor showing. Try again.";
      $('.gameScore').addClass('red');
    }
  }


  $scope.resetEverything = function() {
    var names_list, i;
    names_list = $('.namesToDrag')
    for(i=0; i<names_list.length; i++) {
      names_list[i].style.top = "0px";
      names_list[i].style.left = "0px";
      $('#'+names_list[i].id).draggable({
        disabled: false
      });
    };
    $scope.gameScore = [];
  };

  var shuffleArray = function(array) {
    var m = array.length, t, i;
    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  $scope.directHome = function() {
    $('#entry-screen').show("slow");
    $('#game-screen').hide("slow");
    clearMovieForm();
    $scope.gameScore = [];
  };

  $scope.revealList = function() {
    $('#movieList').show("slow");
  }


});
