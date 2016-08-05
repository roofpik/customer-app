app.controller('nearbyCtrl', function($scope, $timeout, $state, $ionicHistory) {

  $scope.backRoute = function(){
    $ionicHistory.goBack();
  }


    $scope.selectedNearByDistance = true;
    $scope.selectedNearByTime = false;
    $scope.selectedDistanceValue = 1;
    $scope.selectedTimeValue = 5;

    $scope.selectDistance = function() {
        $scope.selectedNearByDistance = true;
        $scope.selectedNearByTime = false;

    }
    $scope.selectTime = function() {
        $scope.selectedNearByDistance = false;
        $scope.selectedNearByTime = true;
    }

    $scope.addDistanceTime = function() {
        if ($scope.selectedNearByDistance) {
            $scope.selectedDistanceValue++;
        } else if ($scope.selectedNearByTime) {
            $scope.selectedTimeValue += 5;
        }
    }

    $scope.minusDistanceTime = function() {
        if ($scope.selectedNearByDistance && $scope.selectedDistanceValue > 0) {
            $scope.selectedDistanceValue--;
        } else if ($scope.selectedNearByTime && $scope.selectedTimeValue > 0) {
            $scope.selectedTimeValue -= 5;
        }
    }

    var loc = JSON.parse(localStorage.getItem('allnearbyLocations'));
    $scope.locationSuggestions = [];

    angular.forEach(loc, function(element) {
        $scope.locationSuggestions.push(element);
    });



    $scope.suggestProjectByLocation = function(input) {
        $scope.suggestedLocationSelected = false;
        if (input.loc == "") {
            $scope.suggestedLocationSelected = true;
            $scope.showApply = false;
        }

    }
    $scope.selectedProjectLocation = {};
    $scope.suggestedLocationSelected = true;
    $scope.showApply = false;


    $scope.selectedNearByLocation = function(suggestedLocation) {

        $scope.suggestedLocationSelected = true;
        $scope.selectedNearbyFilterId = suggestedLocation.nearbyId;

        $scope.showApply = true;

        $timeout(function() {
            $scope.selectedProjectLocation.loc = suggestedLocation.name;

        }, 50);
    }

    var dist = JSON.parse(localStorage.getItem('allnearbyDistances'));


    $scope.nearbyDistanceTime = {};
    $scope.nearbyDistanceTimeFound = []; // found value of all nearby projects


    $scope.nearbyDistanceTime = dist;
    // 

    $scope.nearbyDistanceTimeSelected = false;

    $scope.applyNearbyFilters = function(peak) {

        $scope.nearbyDistanceTimeSelected = true;

        var nearbyInMeters = $scope.selectedDistanceValue * 1000;
        var nearbyInSeconds = $scope.selectedTimeValue * 60;
        var locId = $scope.selectedNearbyFilterId;
        $scope.nearbyDistanceTimeFound = [];

        if ($scope.selectedNearByDistance) {
            angular.forEach($scope.nearbyDistanceTime[locId].residential, function(v, k) {
                if (v['off-peak'] != undefined) {
                    if (v['off-peak'].distance != undefined) {

                        if (v['off-peak'].distance < nearbyInMeters) {
                            $scope.nearbyDistanceTimeFound.push(k);
                        }
                    }

                }
                if (v['peak'] != undefined) {
                    if (v['peak'].distance != undefined) {

                        if (v['peak'].distance < nearbyInMeters) {
                            $scope.nearbyDistanceTimeFound.push(k);
                        }
                    }

                }
            });
        } else if ($scope.selectedNearByTime) {
            angular.forEach($scope.nearbyDistanceTime[locId].residential, function(v, k) {


                if (v['peak'] != undefined) {
                    if (v['peak'].duration != undefined) {
                        if (v['peak'].duration < nearbyInSeconds) {
                            $scope.nearbyDistanceTimeFound.push(k);
                        }
                    }

                }
                if (v['off-peak'] != undefined) {
                    if (v['off-peak'].duration != undefined) {
                        if (v['off-peak'].duration < nearbyInSeconds) {
                            $scope.nearbyDistanceTimeFound.push(k);
                        }
                    }

                }

            });
        }

        // var a = ["1", "1", "2", "3", "3", "1"];
        var unique = $scope.nearbyDistanceTimeFound.filter(function(item, i, ar) {
            return ar.indexOf(item) === i;
        });

        window.localStorage['filteredProjectList'] = JSON.stringify(unique);
        console.log(unique);
        $state.go('properties', {from: 2});
    };


});
