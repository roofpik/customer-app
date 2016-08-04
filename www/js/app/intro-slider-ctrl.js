app.controller('IntroSliderCtrl', ['$scope', '$ionicSlideBoxDelegate', '$state', '$ionicLoading', '$interval', function($scope, $ionicSlideBoxDelegate, $state, $ionicLoading, $interval) {
    $scope.pager = false;
    var count = 0;
    var location = {};
    var hasLocation = checkLocalStorage('selectedLocation');
    if(hasLocation){
        location = JSON.parse(window.localStorage['selectedLocation']);
    }else {
        location = {
            cityId: "-KN7HFa3un2SPyrUKosy",
            cityName: "Gurgaon",
            country: "India",
            latitude: 28.459497,
            locationId: "-KNDfjUlaCq6cFL2nOXo",
            locationName: "Sohna Road",
            longitude: 77.026638,
            state: "Haryana",
            zoneId: "-KND_fEhR2niMrnPUSs-",
            zoneName: "Sohna Road"
        }
        window.localStorage['selectedLocation'] = JSON.stringify(location);
    }
    updateLocalData();

    function updateLocalData() {
        //  $scope.btnNext = true;
        db.ref('appStatus').once('value', function(snapshot) {
            updateAppStatus(snapshot.val());
            updateLocationData();
            updateNearbyData();
            updateProjectData();
            //        $scope.btnNext = false;


        });
    };


    function updateLocationData() {
        console.log('new location data');
        console.log(location.cityId);
        db.ref('location/' + location.cityId).once('value', function(data) {
            window.localStorage['allLocations'] = JSON.stringify(data.val());
            console.log(data.val());
            count = count + 1;
        })
    }

    function updateNearbyData() {
        console.log('new nearby data');
        db.ref('nearby/' + location.cityId).once('value', function(data) {
            window.localStorage['allnearbyLocations'] = JSON.stringify(data.val());
            count = count + 1;
        });

        db.ref('nearbyDistance/' + location.cityId).once('value', function(data2) {
            window.localStorage['allnearbyDistances'] = JSON.stringify(data2.val());
            count = count + 1;
        });
    }

    function updateProjectData() {
        console.log('new project data');
        db.ref('projects/' + location.cityId + '/residential').once('value', function(data) {
            window.localStorage['allProjectsData'] = JSON.stringify(data.val());
            count = count + 1;
        });

        db.ref('projectDisplayData/' + location.cityId + '/residential').once('value', function(data2) {
            window.localStorage['allDisplayData'] = JSON.stringify(data2.val());
            count = count + 1;
        });
    }



    function updateAppStatus(newData) {

        var appStatus = {
            live: '',
            locationVersion: '',
            nearbyVersion: '',
            projectVersion: '',
            version: 1
        }

        appStatus.live = newData.live;
        appStatus.locationVersion = newData.locationVersion;
        appStatus.nearbyVersion = newData.nearbyVersion;
        appStatus.projectVersion = newData.projectVersion;

        window.localStorage['appStatus'] = JSON.stringify(appStatus);

    }

    $scope.skipSlide = function() {
        // $state.go('appStatus');
        // $state.go('signup');
        $ionicSlideBoxDelegate.slide(4);
    }
    $scope.nextSlide = function() {
        console.log($ionicSlideBoxDelegate.currentIndex());
        if ($ionicSlideBoxDelegate.currentIndex() < 3) {
            $ionicSlideBoxDelegate.next();
        } else {
            //    $state.go('signup');
        }
    }

    $scope.slideChanged = function() {

        if ($ionicSlideBoxDelegate.currentIndex() < 4) {
            console.log($ionicSlideBoxDelegate.currentIndex());
        } else {

            $scope.pager = true;
            $ionicSlideBoxDelegate.update();
            $ionicLoading.show({ templateUrl: "templates/loading.html" });

            stop = $interval(function() {
                console.log("count", count);
                if (count == 5) {

                    $ionicLoading.hide();
                    $interval.cancel(stop);
                    $state.go('signup');
                }

            }, 200);
            //  $state.go('appStatus');
            //  $state.go('signup');
        }

    }
}]);
