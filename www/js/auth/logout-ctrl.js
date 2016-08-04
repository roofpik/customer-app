app.controller("LogoutCtrl", ['$scope', '$ionicHistory', '$timeout', '$location', function($scope, $ionicHistory, $timeout, $location){
   delete window.localStorage.userUid;
   delete window.localStorage.userEmail;
   delete window.localStorage.userName;
   delete window.localStorage.currentProject;
   delete window.localStorage.currentChannel;
   $ionicHistory.clearHistory();
   $ionicHistory.clearCache();
   $timeout(function () {
      $location.path("/intro-slider");
   }, 5000);
}])
