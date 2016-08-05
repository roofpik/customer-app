app.controller('HomeCtrl', function($scope, $state, $ionicLoading, $timeout , $ionicScrollDelegate) {
   $scope.data = {};
   $ionicLoading.show({
      template: 'Loading...'
    });

    $timeout(function () {
      $ionicLoading.hide();
      $ionicScrollDelegate.resize();
   }, 2000);

	$scope.goToProjectSearch = function(val){
        $ionicLoading.show();
        $timeout(function(){
            $ionicLoading.hide();
        }, 2000);
        $timeout(function(){
			if(val == 1){
				$state.go('project-search', {type:'search'});
			} else {
				$state.go('project-search', {type:'review'});
			}  
        }, 500);
	}
   

});


