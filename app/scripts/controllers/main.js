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

    var url = 'http://api.espn.com/v1/sports/soccer/eng.1/news/?apikey=qw7zmfchttxkkkfw9anwa7q4&callback=JSON_CALLBACK';
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
        console.log('Success ', data);
      })
      .error(function(data) {
        console.log('Error!! ', data);
      });


  };
  return { getTeams: getTeams };
}]);

app.controller('myAppController', function($scope, dataServices) {
  var teams = dataServices.getTeams().then(function(data) {
    $scope.teams = data;
  });
});


// var getTeams = function() {
//   return $.ajax({
//     url: "http://api.espn.com/v1/sports/soccer/eng.1/news/headlines",
//     data: {
//       // enter your developer api key here
//       apikey: "qw7zmfchttxkkkfw9anwa7q4", limit:5,offset:5,
//       // the type of data you're expecting back from the api
//       _accept: "application/json"
//     },
//     dataType: "jsonp",
//     success: function(data) {
//       console.log('DATA GRAB SUCCESSFUL! ', data);
//     },
//     error: function() {
//        // handle the error
//     }
//   });
// };



