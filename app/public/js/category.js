var categoryApp = angular.module('categoryApp',[]);
var pageUrl = window.location.search.substring(1).split("&");
//parsing the category name from the page url path.
var catId = pageUrl[0].split("=")[1];
var CurrentUser=pageUrl[1].split("=")[1];
console.log("cat id is:"+catId);
console.log("user is:"+CurrentUser);

var model = {
     index: 0,  
 };
var numOfEvents;

categoryApp.run(function($http){
    //sending request to the server in order to bring the specific category events from mongoDB.
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
    $scope.price = 200;
    $scope.time = 21;

    $scope.goBackTime=function(){
             $scope.time=$scope.time-1;
             console.log($scope.time);
             if($scope.time==0){
             $scope.time=23;
             }
            //$scope.todo.items.push({action:actionText, done:false});
    };

    $scope.goBackPrice=function(){
             $scope.price=$scope.price + '30';
             if($scope.price==50){
             $scope.price=200;
             }
            //$scope.todo.items.push({action:actionText, done:false});
    };
    $scope.goNextPrice=function(){
             $scope.price=$scope.price+50;
             if($scope.price==350){
                $scope.price=$scope.price+50;
             }
            //$scope.todo.items.push({action:actionText, done:false});
    };
    $scope.goNextEvent=function(){
            var image = document.getElementById('myImage');
            image.src = "images/unlike.png";
             $scope.index++;
             if($scope.index==numOfEvents){
                $scope.index=0;
             }
            //$scope.todo.items.push({action:actionText, done:false});
    };
    $scope.goBackEvent=function(){
            var image = document.getElementById('myImage');
            image.src = "images/unlike.png";
             $scope.index--;
             if($scope.index<0){
                $scope.index=numOfEvents-1;
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

function hidefunc(){
    document.getElementById("primeryPage").style.visibility = "hidden";
    document.getElementById("longDescription").style.visibility = "visible";
}

function hideLongDescription(){
    document.getElementById("primeryPage").style.visibility = "visible";
    document.getElementById("longDescription").style.visibility = "hidden";
}

function hideEvent(){
    document.getElementById("primeryPage").style.visibility = "hidden";
    document.getElementById("openedSearch").style.visibility = "visible";
}

function hideSearch(){
    document.getElementById("primeryPage").style.visibility = "visible";
    document.getElementById("openedSearch").style.visibility = "hidden";
}
