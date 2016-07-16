var favoritesApp = angular.module('favoritesApp',[]);
var pageUrl = window.location.search.substring(1).split("&");
//parsing the category name from the page url path.
var currentUser = pageUrl[0].split("=")[1];
console.log("curr user is: "+currentUser);

 var model = {
     currentUser   
  };

 favoritesApp.run(function($http){
    $http.get("http://localhost:3000/getEventsByUser/"+currentUser).success(function(data){
     console.log(data);
      model.favoritesEvents = data;
    });
 });

 favoritesApp.controller('myCtrl', function ($scope) {
   $scope.likeList = model;
 });
