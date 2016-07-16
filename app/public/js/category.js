var categoryApp = angular.module('categoryApp',[]);
//var profile = googleUser.getBasicProfile();
//console.log('Email is: ' + profile.getEmail());
var pageUrl = window.location.search.substring(1).split("&");
//parsing the category name from the page url path.
var catId = pageUrl[0].split("=")[1];
var CurrentUser=pageUrl[1].split("=")[1];
console.log("cat id is:"+catId);



var model = {
     index: 0,  
     CurrentUser
 };
var numOfEvents;
var numOfFriends;

console.log("user is:"+model.CurrentUser);
categoryApp.run(function($http){
    if(catId=="ALL")
    {
        console.log("bring all events from DB");
        $http.get("https://circlews.herokuapp.com/getAllEvents/").success(function(data){
            console.log("getting eventts from server..."); 
            model.eventsList=data;
            numOfEvents=data.length;
            console.log(data);
        });

    }
    else{ //thre is a categories
        $http.get("https://circlews.herokuapp.com/getEventsByCategory/"+catId).success(function(data){
            console.log("getting eventts from server..."); 


             if(data.length==0){
                    console.log("didnt find nothing in the search");
                    var didntFindEventJson=[{name:"Didn't find nothing",short_description:"Please go back"}];
                    numOfEvents=1;
                    model.eventsList =didntFindEventJson;
                }
                else{
                    model.eventsList=data;
                    numOfEvents=data.length;
                    console.log(data);
                }



        });

    }
    $http.get("http://localhost:3000/getFriendsByUserMail/"+CurrentUser).success(function(data){
            console.log("getting user friendList from server..."); 
            console.log (data);
            model.friendsList=data;
            numOfFriends=data.length;
            model.friendsList.unshift({email:"NONE"});
            numOfFriends++;
             //console.log (model.friendsList[0].email);
    });

    //sending request to the server in order to bring the specific category events from mongoDB.

});


categoryApp.controller("myEvent", function($scope,$http) {

    $scope.events = model;
    console.log(model);
    $scope.index = 0;
    $scope.FriendIndex=0;
    $scope.price = 500;
    $scope.time = 21;
    $scope.mainButtonText="SEARCH";


    $scope.goBackTime=function(){
             $scope.time=$scope.time-1;
             if($scope.time==-1){
             $scope.time=23;
             }
    };

    $scope.goNextTime=function(){
            if($scope.time==24){
                $scope.time=0;
            }
             $scope.time=$scope.time+1;
             if($scope.time==24){
             $scope.time=0;
             }
    };


/////////////////////     $scope.FriendIndex=0;
  $scope.goBackFriend=function(){
     if($scope.FriendIndex==0){
             $scope.FriendIndex=numOfFriends;
        }
        $scope.FriendIndex=$scope.FriendIndex-1;
            
    };

    $scope.goNextFriend=function(){
            $scope.FriendIndex=$scope.FriendIndex+1;
             if($scope.FriendIndex==numOfFriends){
             $scope.FriendIndex=0;
             }
    };
///////////////////











    $scope.goBackPrice=function(){
             $scope.price=$scope.price - 50;
             if($scope.price==0){
                 $scope.price=1050;
             }
    };
    $scope.goNextPrice=function(){
             $scope.price=$scope.price+50;
             if($scope.price==1050){
                $scope.price=50;
             }
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
     $scope.doingSearch=function(){
        console.log("doingSearchFunc - serching..... data is: ");
        $http({
                method : "GET",
                url : "http://localhost:3000/findEventsByTimeAndPrice?time="+$scope.time+":00&price="+$scope.price+"&cat="+catId
                //url : "http://localhost:3000/findEventsByTimeAndPrice?time=21:00&price=90&cat=NIGHTLIFEx"
             }).then(function mySucces(response) {
                console.log("success responce from server in search function  ");
                console.log(response.data);
                console.log("res length is:" +response.data.length);
                if(response.data.length==undefined){
                    console.log("didnt find nothing in the search");
                    var didntFindEventJson=[{name:"Didnt find nothing",short_description:"Please go back to serach bar or refresh the page"}];
                    console.log(didntFindEventJson);
                    numOfEvents=1;
                    model.eventsList =didntFindEventJson;
                }
                else{
                    numOfEvents=response.data.length;
                    model.eventsList =response.data;
                    $scope.index=0; //show the first resut on the screen
                }
                //$scope.myWelcome = response.data;
             }, function myError(response) {
                console.log("got error from server if search function  ");
                console.log(response.statusText);
                //$scope.myWelcome = response.statusText;
        });
        if($scope.FriendIndex==0){ 
            console.log("no friend to invite");
         } 
        else{
            console.log("invite friend:");
            var invitedTo= model.friendsList[$scope.FriendIndex].email;
            console.log(invitedTo);
            var eventId=$scope.events.eventsList[$scope.index].id;
            console.log("IventId in order invite to:");
            console.log(eventId);

             $http({
                method : "GET",
                url : "http://localhost:3000/inviteUserToEvent?fromUser="+CurrentUser+"&toUser="+invitedTo+"&evantID="+eventId
             }).then(function mySucces(response) {
                console.log("success responce from server in invite user to event function");
             }, function myError(response) {
                console.log("got error from invite user to event function  ");
                console.log(response.statusText);
                //$scope.myWelcome = response.statusText;
        });




        }//else   

    }     
    $scope.hidePrimeryPageEvent=function(){
        //console.log("test55");
        if(isSearchBarOpen==false){
            document.getElementById("primeryPage").style.visibility = "hidden";
            document.getElementById("longDescription").style.visibility = "hidden";
            document.getElementById("openedSearch").style.visibility = "visible";
            isSearchBarOpen=true;
             $scope.mainButtonText="GO!";

        }
        else{
            document.getElementById("primeryPage").style.visibility = "visible";
            document.getElementById("openedSearch").style.visibility = "hidden";
            isSearchBarOpen=false;
            $scope.mainButtonText="SEARCH";
            $scope.doingSearch();
        }
    }
 
});
var isSearchBarOpen=false; //change to flase!!
//document.getElementById("primeryPage").style.visibility = "hidden"; //delete
//document.getElementById("openedSearch").style.visibility = "visible";//delete


function hidefunc(){
    document.getElementById("primeryPage").style.visibility = "hidden";
    document.getElementById("longDescription").style.visibility = "visible";
}

function hideLongDescription(){
    document.getElementById("primeryPage").style.visibility = "visible";
    document.getElementById("longDescription").style.visibility = "hidden";
}



function hideSearch(){
    document.getElementById("primeryPage").style.visibility = "visible";
    document.getElementById("openedSearch").style.visibility = "hidden";
    isSearchBarOpen==false;
}
