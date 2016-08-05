app.controller('sideMenuCtrl', function($scope, $state, $ionicLoading, $timeout) {

    if(checkLocalStorage('selectedLocation')){
        $scope.selectedLocation = JSON.parse(window.localStorage['selectedLocation'] || {});
    }

    $scope.referFriendRoute = function() {
        $state.go('refer');
    }

    $scope.gotoLocation = function() {
        $ionicLoading.show();
        $timeout(function(){
            $ionicLoading.hide();
        }, 2000);
        $timeout(function(){
            $state.go('select-location');
        }, 500);

    }

    $scope.logoutFunc = function() {
        console.log("called logoutFunc");
        AuthenticationService.Logout();
        $state.go("logout");
    }
});