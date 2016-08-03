app.controller('appStatusCtrl', function($scope, $timeout, $ionicLoading, $state, $cordovaDevice, $cordovaNetwork, $ionicPopup, $rootScope) {

    $ionicLoading.show();
    var appInfo = {};
    var location = {};
    checkAppInfo();

    function checkAppInfo() {
        var hasAppInfo = checkLocalStorage("appInfo");
        alert("hasAppInfo", hasAppInfo);
        if (!hasAppInfo) {
            initialiseAppInfo();
            initialiseLocation();
        }
        checkAppStatus();
    }

    function checkAppStatus() {
        var checkNewUser = checkLocalStorage('appStatus');
        if (checkNewUser) {
            db.ref('appStatus').once('value', function(snapshot) {
                var newStatus = snapshot.val();
                var currentStatus = JSON.parse(window.localStorage['appStatus']);
                if (newStatus.live == true) {
                    if (newStatus.version > currentStatus.appversion) {
                        $ionicLoading.hide();
                        //$state.go('update');
                    } else {
                        //Checks
                        if (newStatus.locationVersion > currentStatus.locationVersion) {
                            updateLocationData();
                        }
                        if (newStatus.nearbyVersion > currentStatus.nearbyVersion) {
                            updateNearbyData();
                        }
                        if (newStatus.nearbyVersion > currentStatus.nearbyVersion) {
                            updateProjectData();
                        }
                        checkLoginStatus();
                    }
                } else {
                    $ionicLoading.hide();
                    //$state.go('underconstruction');
                }
            });
        } else {
            if (newStatus.live == false) {
                $ionicLoading.hide();
                //$state.go('underconstruction');
            } else {
                db.ref('appStatus').once('value', function(snapshot) {
                    window.localStorage['appStatus'] = JSON.stringify(snapshot.val())
                })
                updateLocationData();
                updateNearbyData();
                updateProjectData();
                $ionicLoading.hide();
                //$state.go('intro-slider');
            }
        }
    }

    function updateLocationData() {
        db.ref('location/' + location.cityId).once('value', function(data) {
            window.localStorage['allLocations'] = JSON.stringify(data.val());
        })
    }

    function updateNearbyData() {
        db.ref('nearby/' + location.cityId).once('value', function(data) {
            window.localStorage['allnearbyLocations'] = JSON.stringify(data.val());
        });

        db.ref('nearbyDistance/' + location.cityId).once('value', function(data2) {
            window.localStorage['allnearbyDistances'] = JSON.stringify(data2.val());
        });
    }

    function updateProjectData() {
        db.ref('projects/' + location.cityId + '/residential').once('value', function(data) {
            window.localStorage['allProjectsData'] = JSON.stringify(data.val());
        });

        db.ref('projectDisplayData/' + location.cityId + '/residential').once('value', function(data2) {
            window.localStorage['allDisplayData'] = JSON.stringify(data2.val());
        });
    }


    function checkLoginStatus() {
        var checkLogin = checkLocalStorage('userUid');
        if (checkLogin) {
            $ionicLoading.hide();
            //$state.go('app.home')
        } else {
            $ionicLoading.hide();
            //$state.go('signup')
        }
    }

    function initialiseAppInfo() {
        var date = new Date();
        var currTimeStamp = date.getTime();
        appInfo = {
            udid: 'na',
            uuid: 'na',
            os: '',
            platform: '',
            version: '',
            model: '',
            manufacture: '',
            deviceToken: 0,
            error: '',
            timeStamp: currTimeStamp
        };
        registerDevice();
    }

    function registerDevice() {
        try {
            var deviceInformation = $cordovaDevice.getDevice();
            appInfo.udid = deviceInformation.serial;
            appInfo.uuid = deviceInformation.uuid;
            appInfo.os = "1";
            appInfo.platform = deviceInformation.platform;
            appInfo.version = deviceInformation.version;
            appInfo.model = deviceInformation.model;
            appInfo.manufacture = deviceInformation.manufacturer;
            appInfo. = timeStamp;
        } catch (e) {
            appInfo.error = e;
        };
        window.localStorage['appInfo'] = JSON.stringify(appInfo);
        db.ref('deviceInformation/' + appInfo.uuid).update(appInfo).then(function() {});
    }

    function initialiseLocation() {
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

});
