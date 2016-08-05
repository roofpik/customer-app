app.controller('termsConditionsCtrl', function($scope, $state){

	$scope.myGoBack = function(){
		$state.go('app.home');
	}
	
});