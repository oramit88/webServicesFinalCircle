var categoryApp = angular.module('categoryApp',[]);
var pageUrl = window.location.search.substring(1).split("&");
var catId = pageUrl[0].split("=")[1];
console.log("cat id is:"+catId);


var model = {
     index: 0   
 };
var numOfEvents;


categoryApp.run(function($http){
    $http.get("https://circlews.herokuapp.com/getEventsByCategory/"+catId).success(function(data){
        console.log("getting eventts from server..."); 
        model.eventsList=data;
         numOfEvents=data.length;
         console.log("list is is:");
    });
});


categoryApp.controller("myEvent", function($scope,$http) {
    $scope.events = model;
    $scope.index = 0;
    
    $scope.goNextEvent=function(){
            var image = document.getElementById('myImage');
            image.src = "images/unlike.png";
             $scope.index++;
             if($scope.index==numOfEvents){
                $scope.index=0;
             }
            //$scope.todo.items.push({action:actionText, done:false});
    };

    $scope.changeImage =function() {
        var image = document.getElementById('myImage');
        if (image.src.match("unlike")) {
            image.src = "images/like.png";
            $http.get("https://circlews.herokuapp.com/setLikeToEvent/"+$scope.events.eventsList[$scope.index].id).success(function(data){
            console.log("set like:" + data);
            });
        } 
        else {
            image.src = "images/unlike.png";
        }


    }   
});

