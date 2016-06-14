 var circleApp = angular.module('circleApp',[]);

var model = {
        
 };

circleApp.run(function($http){
  $http.get("http://localhost:3000/getAllCategories").success(function(data){
    console.log(data);
    model.categories = data[0].categories;
  });
});

circleApp.controller('myCtrl', function ($scope) {
  $scope.circle = model;
});

// circleApp.controller("myCtrl", function($scope) {
//   $scope.categories = [
//         {"name": "ALL","color": "black"},
//         {"name": "MUSIC","color": "green"},
//         {"name": "ART","color": "purple"},
//         {"name": "NIGHTLIFE","color": "blue"},
//         {"name": "RESTARANTS","color": "gray"},
//         {"name": "BARS&PUBS","color": "cyan"},
//         {"name": "FILMS","color": "yellow"},
//         {"name": "THEATRE","color": "orange"},
//         {"name": "ATTRACTIONS","color": "red"}
//     ]
// });

// circleApp.controller('ToDoCtrl', function ($scope) {
//   $scope.todo = model;

//   $scope.incompleteCount = function(){
//     var count = 0;
//     angular.forEach($scope.todo.items, function(item){
//       if(!item.done) {count++}
//     });
//     return count;
// };

// $scope.warningLevel= function(){
//   return $scope.incompleteCount()<3 ? "label-success" : "label-warning";
// };

// $scope.addNewItem = function(actionText){
//   $scope.todo.items.push({ action: actionText, done:false});
// };


