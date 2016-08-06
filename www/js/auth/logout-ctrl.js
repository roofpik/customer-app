app.controller("LogoutCtrl", ['$scope', 'AuthenticationService','$ionicHistory', '$timeout', '$location', '$state', function($scope, AuthenticationService, $ionicHistory, $timeout, $location, $state){

   $ionicHistory.clearHistory();
   $ionicHistory.clearCache();
   localStorage.clear();
   try{
   firebase.auth().signOut();
   }
   catch(e){

   }
   $timeout(function () {
      $state.go("app-start");
   }, 6000);
}])
