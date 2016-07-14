var historyApp = angular.module('historyApp',[]);

 var model = {

  };

  var model2 = {

  };

 historyApp.run(function($http){
     console.log("test2");
    $http.get("http://localhost:3000/getEvantsThatUserInvaitedTo/oramit88@gmail.com").success(function(data){
     model.myHistory=data;
     console.log(data);
    });
 });

 historyApp.controller('myCtrl', function ($scope) {
   $scope.historyList = model;
 });


  historyApp.run(function($http){
     console.log("test2");
    $http.get("http://localhost:3000/getEvantsThatUserInvited/oramit88@gmail.com").success(function(data){
     model2.invaitedHistory=data;
     console.log(data);
    });
 });

 historyApp.controller('myCtrl2', function ($scope) {
   $scope.invaitedList = model2;
 });