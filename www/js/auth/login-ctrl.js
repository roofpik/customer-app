app.controller('LoginCtrl', ['$scope', 'AuthenticationService', '$ionicPopup', '$state', function($scope, AuthenticationService, $ionicPopup, $state){

	// AuthenticationService.Logout();

	console.log("login controller");

	$scope.user = {
      userEmail: '',
      userPassword: '',
   }

	$scope.loginEmail = function(){
		console.log("email login clicked");
		// console.log($scope.user.userEmail, $scope.user.userPassword);
      AuthenticationService.LoginEmail($scope.user.userEmail, $scope.user.userPassword, function(result){
         console.log(result);

         if(result === true){
            console.log(result);
         }
         else{
            console.log("result = false, error in login");
         }
      });
   }
	$scope.loginGmail = function(){
		console.log("gmail login button clicked");
		AuthenticationService.LoginGmail();
	}

	$scope.showPopup = function() {
      $scope.data = {}
      // Custom popup
      var myPopup = $ionicPopup.show({
         template: '<input type = "text" ng-model = "data.model">',
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
								console.log($scope.data.model);
								var auth = firebase.auth();
						      var emailAddress = $scope.data.model;
						      auth.sendPasswordResetEmail(emailAddress).then(function() {
						         console.log("email sent");
									sentPopup();
						      }, function(error) {
						         console.log(error);
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
