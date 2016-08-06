app.controller('HomeCtrl', function($scope, $state, $ionicLoading, $timeout , $ionicSlideBoxDelegate) {
   $scope.data = {};
   $ionicSlideBoxDelegate.update();
  localStorage.removeItem('filteredProjectList');
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
    window.open('http://www.roofpik.com',  '_system', 'location=yes');
  }


  $scope.openNearby = function(){
    $state.go('nearby');
  }

  $scope.neighbourhoodRoute = function(){
     $state.go('bee-social');
  }

});


