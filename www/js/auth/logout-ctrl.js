app.controller("LogoutCtrl", ['$scope', '$ionicHistory', '$timeout', '$location', '$state', function($scope, $ionicHistory, $timeout, $location, $state){
   delete window.localStorage.userUid;
   delete window.localStorage.userEmail;
   delete window.localStorage.userName;
   delete window.localStorage.currentProject;
   delete window.localStorage.currentChannel;
   $ionicHistory.clearHistory();
   $ionicHistory.clearCache();
   db.auth().signOut();
   $timeout(function () {
      $state.go("intro-slider");
   }, 5000);
}])
