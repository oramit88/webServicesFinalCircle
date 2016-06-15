var circleApp = angular.module('circleApp',[]);
var model = {
        
 };

circleApp.run(function($http){
//getting a list of categories from mongo collection
  $http.get("https://circlews.herokuapp.com/getAllCategories").success(function(data){
    console.log(data);
    model.categories = data[0].categories;
  });
});

circleApp.controller('myCtrl', function ($scope) {
  $scope.circle = model;
});
