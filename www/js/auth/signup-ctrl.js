app.controller("SignupCtrl", ['$scope', '$http', '$ionicPopup', '$ionicHistory', '$ionicLoading', '$state', function($scope, $http, $ionicPopup, $ionicHistory, $ionicLoading, $state){

   $scope.user = {};
   $ionicHistory.clearHistory();
   $ionicHistory.clearCache();
   try{
   $scope.deviceId = JSON.parse(localStorage.appInfo).uuid;
}
catch(e){
    $scope.deviceId = "na";
}

   $scope.signup = function(){
      $ionicLoading.show();
      var userData = {
         name: $scope.user.name,
         email: $scope.user.email,
         mobileNum: $scope.user.mobileNum,
         password: $scope.user.password,
         referralCode: $scope.user.referralCode,
         deviceId: $scope.deviceId
      }
      console.log(userData);
      $http.post("http://139.162.3.205/api/addUser", userData)
         .success(function(response){
            console.log("success");
            console.log(response);
            $ionicLoading.hide();
            if(response.StatusCode == '400'){
               $ionicPopup.alert({
                  title: "Error Occured",
                  template: response.Message
               });
            }
            else if(response.StatusCode == '200'){
               $ionicPopup.alert({
                  title: "Message",
                  template: response.Message
               });
            }
         })
         .error(function(response){
            console.log("error");
            console.log(response);
            $ionicLoading.hide();
            $ionicPopup.alert({
               title: "Authentication Error",
               template: response.Message
            });
         });
   }

   $scope.goToLogin = function(){
      $state.go('login');
   }
}]);
