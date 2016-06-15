var favoritesApp = angular.module('favoritesApp',[]);
 var model = {
        
  };

 favoritesApp.run(function($http){
    console.log("test2");
    //sending request to the server in order to bring all current user favorite events from mongoDB.
    $http.get("https://circlews.herokuapp.com/getEventsByUser").success(function(data){
        console.log(data);
        model.favoritesEvents = data;
    });
 });

 favoritesApp.controller('myCtrl', function ($scope) {
   $scope.likeList = model;
 });
