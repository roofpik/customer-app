app.controller("beeSocialCtrl", function($scope, $state){

	$scope.myGoBack = function(){
		$state.go('app.home');
	}
});