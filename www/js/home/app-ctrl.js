app.controller('AppCtrl', function($scope, $location, $timeout, $ionicModal, $state, AuthenticationService) {
	console.log(window.localStorage['selectedLocation']);
	if(checkLocalStorage('selectedLocation')){
		$scope.selectedLocation = JSON.parse(window.localStorage['selectedLocation'] || {});
	}

	$scope.uid = window.localStorage.getItem("userUid");
	$scope.currentProject = window.localStorage.getItem("currentProject");
    $scope.currentChannel = window.localStorage.getItem("currentChannel");
    console.log($scope.uid, $scope.currentProject, $scope.currentChannel);

	var allprojects = db.ref("neighbourhood/data/users/"+$scope.uid+"/projects");
	$scope.allprojects = [];
	allprojects.on("value", function(snapshot){
		console.log(snapshot.val());
		$scope.allprojects = snapshot.val();
	})

	var allchannels = db.ref("neighbourhood/data/users/"+$scope.uid+"/projects/"+$scope.currentProject+"/channels");
	$scope.allchannels = [];
	allchannels.on("value", function(snap){
		console.log(snap.val());
		$scope.allchannels = snap.val();
	})

	$scope.neighbourhoodRoute = function(){
		if($scope.allprojects === null){
			console.log('all projects');
			$location.path("/add-project");
		}
		else{
			if($scope.currentProject !== null && $scope.currentChannel !== null){
				if($scope.allchannels === null){
					console.log('all channels page');
					$location.path("/"+$scope.currentProject+"/all-channels");
				}
				else{
					console.log('everything working');
					$location.path("/"+$scope.currentProject+"/"+$scope.currentChannel+"/neighbourhood");
				}
			}
			else if($scope.currentProject === null && $scope.currentChannel === null){
				console.log("first time visitor");
				// get list of joined projects
				var joinedProjectsRef = db.ref("neighbourhood/data/users/"+$scope.uid+"/projects");
			    joinedProjectsRef.on("value", function(snap){
					console.log(snap.val());
					var allProjects = snap.val();
					$scope.joinedProjects = [];
					for(var i in allProjects){
						var indi_projects = db.ref("neighbourhood/data/projects/"+i);
						$scope.joinedProjects.push($firebaseObject(indi_projects));
					}
			    });
				$ionicModal.fromTemplateUrl('templates/neighbourhood/joined-projects.html', {
					scope: $scope,
					animation: 'slide-in-up'
				}).then(function(modal) {
					$scope.modal = modal;
					$scope.modal.show();
				});
				$scope.closeModal = function() {
			      $scope.modal.hide();
			   };
			}
		}
	}

	$scope.referFriendRoute = function(){
		$state.go('refer');
	}

	$scope.gotoLocation = function(){
		$state.go('select-location');
	}

	$scope.logoutFunc = function(){
		console.log("called logoutFunc");
		AuthenticationService.Logout();
		$state.go("logout");
	}
});

function checkLocalStorage(item){
	if (localStorage.getItem(item) === null ||  typeof window.localStorage[item] === 'undefined') {
      return false
   }
   else{
   	return true
   }
}
