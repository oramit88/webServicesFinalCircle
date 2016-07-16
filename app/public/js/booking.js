var historyApp = angular.module('historyApp',[]);
var pageUrl = window.location.search.substring(1).split("&");
//parsing the category name from the page url path.
var currentUser = pageUrl[0].split("=")[1];
console.log("curr user is: "+currentUser);
 
 
 var model = {
    currentUser
  };

  var model2 = {
    currentUser
  };

 historyApp.run(function($http){
     console.log("test2");
    $http.get("http://localhost:3000/getEvantsThatUserInvaitedTo/"+currentUser).success(function(data){
     model.myHistory=data;
     console.log(data);
    });
 });

 historyApp.controller('myCtrl', function ($scope) {
   $scope.historyList = model;
 });

 historyApp.controller('goToHomeCntrl', function ($scope) {
   $scope.goHomeLink = currentUser;
 });


  historyApp.run(function($http){
     console.log("test2");
    $http.get("http://localhost:3000/getEvantsThatUserInvited/"+currentUser).success(function(data){
     model2.invaitedHistory=data;
     console.log(data);
    });
 });

 historyApp.controller('myCtrl2', function ($scope) {
   $scope.invaitedList = model2;
 });