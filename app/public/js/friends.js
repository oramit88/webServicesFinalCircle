var pageUrl = window.location.search.substring(1).split("&");
//parsing the category name from the page url path.
var currentUser = pageUrl[0].split("=")[1];
//console.log("curr user is: "+currentUser);
var friendsApp = angular.module('friendsApp',[]);

var model = {
      currentUser
};

 friendsApp.run(function($http){
    $http.get("https://circlews.herokuapp.com/getFriendsByUserMail/"+currentUser).success(function(data){
     model.myFriends=data;
     console.log(data);
    });
 });

 friendsApp.controller('myCtrl', function ($scope) {
   $scope.friendList = model;
 });