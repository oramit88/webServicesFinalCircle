var pageUrl = window.location.search.substring(1).split("&");
//parsing the category name from the page url path.
var currentUser = pageUrl[0].split("=")[1];
console.log("current user is:"+currentUser);


var circleApp = angular.module('circleApp',[]);

var model = {
    currentUser
 };

circleApp.run(function($http){
  $http.get("https://circlews.herokuapp.com/getAllCategories").success(function(data){
    console.log(data);
    model.categories = data[0].categories;
  });
});

circleApp.controller('myCtrl', function ($scope) {
  $scope.circle = model;

});
