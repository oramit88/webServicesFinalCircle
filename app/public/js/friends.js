var pageUrl = window.location.search.substring(1).split("&");
//parsing the category name from the page url path.
var currentUser = pageUrl[0].split("=")[1];
console.log("curr user is: "+currentUser);
var friendsApp = angular.module('friendsApp',[]);

 var model = {

  };

 friendsApp.run(function($http){
     console.log("test2");
    $http.get("http://localhost:3000/getFriendsByUserMail/"+currentUser).success(function(data){
     model.myFriends=data;
     console.log(data);
    });
 });

 friendsApp.controller('myCtrl', function ($scope) {
   $scope.friendList = model;
 });