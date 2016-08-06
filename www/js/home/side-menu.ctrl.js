app.controller('sideMenuCtrl', function($scope, $state, $ionicLoading, $timeout, AuthenticationService) {

    if (checkLocalStorage('selectedLocation')) {
        $scope.selectedLocation = JSON.parse(window.localStorage['selectedLocation'] || {});
    }


    if(checkLocalStorage('userUid')){
        $scope.ifNotLogin = false;
    }
    else{
        $scope.ifNotLogin = true;
    }

    $scope.referFriendRoute = function() {
        $state.go('refer');
    }

    $scope.gotoLocation = function() {
        $ionicLoading.show();
        $timeout(function() {
            $ionicLoading.hide();
        }, 2000);
        $timeout(function() {
            $state.go('select-location');
        }, 500);

    }

    $scope.myProfile = function() {
        $state.go('profile');
    }

    $scope.logoutFunc = function() {
        console.log("called logoutFunc");
        $state.go("logout");
    }

    $scope.termsNcndtn = function() {
        $state.go('terms-n-conditions');
    }

    $scope.privacyPolicy = function() {
        $state.go('privacy-policy');
    }

    $scope.writeReview = function() {
        $state.go('project-search', { type: 'review' });
    }

    $scope.nearby = function() {
        $state.go('nearby');
    }

    $scope.signup = function(){
        $state.go('signup');
    }

});
