app.controller("LogoutCtrl", ['$scope', '$ionicHistory', '$timeout', '$location', '$state', function($scope, $ionicHistory, $timeout, $location, $state){

   $ionicHistory.clearHistory();
   $ionicHistory.clearCache();
   localStorage.clear();
   try{
   db.auth().signOut();
   }
   catch(e){
      
   }
   $timeout(function () {
      $state.go("app-start");
   }, 5000);
}])
