// var createApp = angular.module('createApp',[]);
// var pageUrl = window.location.search.substring(1).split("&");
// //parsing the category name from the page url path.
// var currentUser = pageUrl[0].split("=")[1];
// console.log("curr user is: "+currentUser);

//  var model = {
//      currentUser   
//   };

//  createApp.run(function($http){
//      console.log("test2");
//     $http.get("http://localhost:3000/getEventsByUser/"+currentUser).success(function(data){
//      console.log(data);
//       model.favoritesEvents = data;
//     });
//  });

//  createApp.controller('myCtrl', function ($scope) {
//    $scope.likeList = model;
//  });

 function create(){

      var obj1 = document.getElementsByName('name')[0].value;
      console.log(obj1);

      var obj2 = document.getElementsByName('category')[0].value;
      console.log(obj2);

      var obj3 = document.getElementsByName('date')[0].value;
      console.log(obj3);

      var obj4 = document.getElementsByName('time')[0].value;
      console.log(obj4);

      var obj5 = document.getElementsByName('price')[0].value;
      console.log(obj5);

      var obj6 = document.getElementsByName('distance')[0].value;
      console.log(obj6);

      var obj7 = document.getElementsByName('short_description')[0].value;
      console.log(obj7);

      var obj8 = document.getElementsByName('long_description')[0].value;
      console.log(obj8);
 }

