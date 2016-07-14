var friendsApp = angular.module('friendsApp',[]);

 var model = {

  };

 friendsApp.run(function($http){
     console.log("test2");
    $http.get("http://localhost:3000/getFriendsByUserMail/oramit88@gmail.com").success(function(data){
     model.myFriends=data;
     console.log(data);
    });
 });

 friendsApp.controller('myCtrl', function ($scope) {
   $scope.friendList = model;
 });