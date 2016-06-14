var categoryApp = angular.module('categoryApp',[]);
var pageUrl = window.location.search.substring(1).split("&");
var catId = pageUrl[0].split("=")[1];
//console.log("path is:"+catId);


var model = {
     index: 0   
 };
var numOfEvents;


categoryApp.run(function($http){
    $http.get("http://localhost:3000/getEventsByCategory/"+catId).success(function(data){
        console.log("getting eventts from server..."); 
        model.eventsList=data;
         numOfEvents=data.length;
         console.log("list is is:");
    });
});


categoryApp.controller("myEvent", function($scope) {
    $scope.events = model;
    $scope.index = 0;
  
    //console.log($scope.events.eventsList.length);
    // $scope.name=name;
    // console.log("scope category is:"+category1);   
    // $scope.short_desc=short_description;
    // $scope.distance=distance;
    $scope.goNextEvent=function(){
             $scope.index++;
             if($scope.index==numOfEvents){
                $scope.index=0;
             }
            //$scope.todo.items.push({action:actionText, done:false});
    };
});

//new from here

// var categoryApp = angular.module('myApp', []);
// categoryApp.controller('myEvent', function($scope, $http) {
//     $http({
//         method : "GET",
//         url : "http://localhost:3000/getEventsByCategory/"+catId
//     }).then(function mySucces(response) {
//         console.log(response.data);
//         //$scope.myWelcome = response.data;
//     }, function myError(response) {
//        console.log("error"+response.statusText);
//         //$scope.myWelcome = response.statusText;
//     });
// });

