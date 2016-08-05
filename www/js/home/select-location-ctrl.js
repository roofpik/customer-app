app.controller('selectLocationCtrl', function($scope, $state, $timeout, $ionicLoading) {
    $ionicLoading.show();
    $scope.goBack = function() {
        $state.go('app.home');
    }
    var allLocations;

    $timeout(function() {
        $scope.locations = [];
        allLocations = JSON.parse(window.localStorage['allLocations'] || {});
        angular.forEach(allLocations, function(val, key) {
            $scope.locations.push(val);
        });
    }, 500)

    $timeout(function() {
        $ionicLoading.hide();
    }, 2000)


    $scope.selectLocation = function(selLocation) {
        window.localStorage['selectedLocation'] = JSON.stringify(allLocations[selLocation]);
        $state.go('app.home');

    }
});
