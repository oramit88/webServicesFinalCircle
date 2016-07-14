var mainMenu = angular.module('mainMenu',[]);
var pageUrl = window.location.search.substring(1).split("&");
//parsing the category name from the page url path.
var currentUser = pageUrl[0].split("=")[1];
console.log("current user is:"+currentUser);

var model = {
      currentUser
};
//console.log("tessst"+ model.currentUser);

mainMenu.controller("myMenu", function($scope) {
    $scope.currUser = model;
    $scope.test="abc";
    //console.log("tessst2"+ currUser);
});

  function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  var currentUser=profile.getEmail();
  window.location = "mainmenu.html?usrer="+currentUser;
}
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }