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
var currEventId;

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
            currEventId=model.eventsList[0].id;
            console.log("xxxID  is"+currEventId);
            $http.get("http://localhost:3000/isUserLikeEvent?user="+CurrentUser+"&evantId="+currEventId).success(function(data){
                console.log("xxxID  is"+currEventId);
                //console.log ("IS-LIKE");
                console.log(data.isUserLikeEvent);
                var image = document.getElementById('myImage');
                if(data.isUserLikeEvent=="TRUE"){                      
                        image.src= "images/like.png";
                        }
                else{
                        console.log("FALSE: "); 
                        image.src = "images/unlike.png";
                }

             });

        });

    }
    else{ //specific categry choosen
        //sending request to the server in order to bring the specific category events from mongoDB.
        $http.get("https://circlews.herokuapp.com/getEventsByCategory/"+catId).success(function(data){
            console.log("getting eventts from server from category "+catId); 
            if(data.length==0){
                    console.log("didnt find nothing in the search");
                    var didntFindEventJson=[{name:"Didn't find nothing",short_description:"Please go back to categorie page"}];
                    numOfEvents=1;
                    model.eventsList =didntFindEventJson;
                }
                else{ //found something
                    model.eventsList=data;
                    numOfEvents=data.length;
                    //console.log(data);
                    currEventId=model.eventsList[0].id;
                    console.log("curr ID  is"+currEventId);
                    //checking the is the current user like the current event- if so fill the heart image
                    $http.get("http://localhost:3000/isUserLikeEvent?user="+CurrentUser+"&evantId="+currEventId).success(function(data){
                        console.log(data.isUserLikeEvent);
                        var image = document.getElementById('myImage');
                        if(data.isUserLikeEvent=="TRUE"){                      
                                image.src= "images/like.png";
                                }
                        else{
                                console.log("FALSE: "); 
                                image.src = "images/unlike.png";
                        }

                     });
                }

            });
    }
    //getting the friends list of the current user.
    $http.get("http://localhost:3000/getFriendsByUserMail/"+CurrentUser).success(function(data){
            console.log("getting user friendList from server..."); 
            console.log (data);
            model.friendsList=data;
            numOfFriends=data.length;
            model.friendsList.unshift({email:"NONE"});
            numOfFriends++;
             //console.log (model.friendsList[0].email);
    });
});


categoryApp.controller("myEvent", function($scope,$http) {

    $scope.events = model;
    //console.log(model);
    $scope.index = 0;
    $scope.FriendIndex=0;
    $scope.price = 500; //the default price in the search bar
    $scope.time = 21; //the default time in the search bar = 21:00
    $scope.mainButtonText="SEARCH";
    $scope.likeImage="images/like.png";
    $scope.UnLikeImage="images/unlike.png"; 
    $scope.LikeImagePathOfTheHtml="../images/unlike.png";
    var heartimage = document.getElementById('myImage');
    
    $scope.goNextEvent=function(){
            $scope.index++;
            if($scope.index==numOfEvents){ //end of list
                $scope.index=0; //go beck to the start
            }
            //chacking if the user like the next event
            $http.get("http://localhost:3000/isUserLikeEvent?user="+CurrentUser+"&evantId="+model.eventsList[$scope.index].id).success(function(data){
                    if(data.isUserLikeEvent=="TRUE"){
                        heartimage.src= $scope.likeImage;
                    }
                    else{
                        heartimage.src = $scope.UnLikeImage;
                    }
             });
    };
    $scope.goBackEvent=function(){
             $scope.index--;
             if($scope.index<0){
                $scope.index=numOfEvents-1;
             }
             $http.get("http://localhost:3000/isUserLikeEvent?user="+CurrentUser+"&evantId="+model.eventsList[$scope.index].id).success(function(data){
                    console.log ("goBackEvent event func");
                    //console.log ("CurrEventID: ");
                    //console.log(model.eventsList[$scope.index].id);
                    if(data.isUserLikeEvent=="TRUE"){
                        heartimage.src= $scope.likeImage;
                    }
                    else{
                        heartimage.src = $scope.UnLikeImage;
                    }
             });
    };

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
   
    
    $scope.changeImage =function() { //Pressin on the heart image == giving LIKE to the event
        if (heartimage.src.match($scope.UnLikeImage)) {
            heartimage.src = $scope.likeImage;
            $http.get("https://circlews.herokuapp.com/setLikeToEvent/"+$scope.events.eventsList[$scope.index].id).success(function(data){
                console.log("set like:" + data);
            });
        } 
        else {
            heartimage.src = $scope.UnLikeImage; 
            $http.get("https://circlews.herokuapp.com/setUnLikeToEvent/"+$scope.events.eventsList[$scope.index].id).success(function(data){
                console.log("set Unlike:" + data);
            });
        }
    }

     $scope.doingSearch=function(){
        console.log("doingSearchFunc - serching..... data is: ");
        $http({
                method : "GET",
                url : "http://localhost:3000/findEventsByTimeAndPrice?time="+$scope.time+":00&price="+$scope.price+"&cat="+catId
               
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
             }, function myError(response) {
                console.log("got error from server if search function  ");
                console.log(response.statusText);

        });
        if($scope.FriendIndex==0){ 
            console.log("no friend to invite");
         } 
        else{ //the user  shhose to invite someon to the event
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
            });
        }  

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
