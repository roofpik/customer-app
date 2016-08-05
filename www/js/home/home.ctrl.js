app.controller('HomeCtrl', function($scope, $state, $ionicLoading, $timeout , $ionicScrollDelegate) {
   $scope.data = {};
   $ionicLoading.show({});

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
	$scope.takeToProjects = function(){
		$ionicLoading.show();
        $timeout(function(){
            $ionicLoading.hide();
        }, 2000);
        $timeout(function(){
        	$state.go('properties', {from: 1});
        }, 500);
	}

  $scope.goToRefer = function(){
    $state.go('refer');
  }

  $scope.goToRoofpik = function(){
    window.open('http://www.roofpik.com');
  }


  $scope.openNearby = function(){
    $state.go('nearby');
  }

});


