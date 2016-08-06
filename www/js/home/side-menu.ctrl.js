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

    $scope.myProfile = function(){
        $state.go('profile');
    }

    $scope.logoutFunc = function() {
        console.log("called logoutFunc");
        AuthenticationService.Logout();
        $state.go("logout");
    }

    $scope.termsNcndtn = function(){
        $state.go('terms-n-conditions');
    }

    $scope.privacyPolicy = function(){
        $state.go('privacy-policy');
    }

});