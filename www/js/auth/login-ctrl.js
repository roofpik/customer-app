app.controller('LoginCtrl', ['$scope', 'AuthenticationService', '$ionicPopup', '$state', function($scope, AuthenticationService, $ionicPopup, $state){

	// AuthenticationService.Logout();
	$scope.user = {
      userEmail: '',
      userPassword: '',
   }

	$scope.loginEmail = function(){
      AuthenticationService.LoginEmail($scope.user.userEmail, $scope.user.userPassword, function(result){
      });
   }
	// $scope.loginGmail = function(){
	// 	console.log("gmail login button clicked");
	// 	AuthenticationService.LoginGmail();
	// }

	$scope.showPopup = function() {
      $scope.data = {}
      // Custom popup
      var myPopup = $ionicPopup.show({
         template: '<input type = "email" ng-model = "data.model">',
         title: 'Reset Password',
         subTitle: 'Enter your email address',
         scope: $scope,

         buttons: [
            { text: 'Cancel' }, {
               text: '<b>Send Link</b>',
               type: 'bluecolor',
                  onTap: function(e) {

                     if (!$scope.data.model) {
                        //don't allow the user to close unless he enters model...
                           e.preventDefault();
                     } else {
								var auth = firebase.auth();
						      var emailAddress = $scope.data.model;
						      auth.sendPasswordResetEmail(emailAddress).then(function() {
									sentPopup();
						      }, function(error) {
						      });
                        return $scope.data.model;
                     }
                  }
            }
         ]
      });
   };

	function sentPopup(){
		$ionicPopup.alert({
       title: 'Reset Link sent to your email address!',
      //  template: 'It might taste good'
     });
   };

   $scope.goToSignup = function(){
      $state.go('signup');
   }

}]);
