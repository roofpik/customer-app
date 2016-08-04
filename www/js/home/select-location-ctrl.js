app.controller('selectLocationCtrl', function($scope, $state, $timeout){

	$scope.goBack = function(){
		history.back();
	}

	$scope.locations = [];

	var allLocations = JSON.parse(window.localStorage['allLocations'] || {});
	console.log(allLocations);
	angular.forEach(allLocations, function(val, key){
		$scope.locations.push(val);
	});

	$scope.selectLocation = function(selLocation){
		window.localStorage['selectedLocation'] = JSON.stringify(selLocation);
		$state.go('app.home');

	}
});
