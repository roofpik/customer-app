app.controller('privacyPolicyCtrl', function($scope, $state){

	$scope.myGoBack = function(){
		$state.go('app.home');
	}
	
});