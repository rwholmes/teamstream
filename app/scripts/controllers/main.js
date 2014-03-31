'use strict';

var app = angular.module('teamstreamApp');

app.controller('MainCtrl', function ($scope) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
});

// Controller and function for getting data from api

var newsOffset = 5;
var newsLimit = 0;

app.factory('dataServices', ['$http', function($http) {
  var getTeams = function() {
    var url = 'http://api.espn.com/v1/sports/soccer/eng.1/teams/?apikey=qw7zmfchttxkkkfw9anwa7q4&callback=JSON_CALLBACK';
    var data = {
        // enter your developer api key here
        apikey: 'qw7zmfchttxkkkfw9anwa7q4',
        // the type of data you're expecting back from the api
        _accept: 'application/json',
        // number of results to be shown
        limit: newsLimit,
        offset: newsOffset
      };

    return $http.jsonp(url)
      .success(function(data){
        console.log('Success getting teams.');
      })
      .error(function(data) {
        console.log('Error getting teams.');
      });
  };

  var getHeadlines = function() {
    var url = 'http://api.espn.com/v1/sports/soccer/eng.1/news/?apikey=qw7zmfchttxkkkfw9anwa7q4&callback=JSON_CALLBACK';
    return $http.jsonp(url)
      .success(function(data){
        console.log('Success getting headlines.');
      })
      .error(function(data) {
        console.log('Error getting headlines.');
      });
  };
  return {
    getTeams: getTeams,
    getHeadlines: getHeadlines
  };
}]);

app.controller('myHeadlinesController', function($scope, dataServices) {
  var headlines = dataServices.getHeadlines().then(function(data) {
    console.log('Data.data.headlines ', data.data.headlines);
    $scope.headlines = data.data.headlines;
  });

});

app.controller('myTeamsController', function($scope, dataServices) {

  var teams = dataServices.getTeams().then(function(data) {
    console.log('Data.data.teams ', data.data.sports[0].leagues[0].teams);
    $scope.teams = data.data.sports[0].leagues[0].teams;
  });
});



