app.controller('appLandingCtrl', function($scope, $timeout, $ionicHistory, $ionicLoading, $state, $cordovaDevice, $cordovaNetwork, $ionicPopup, $rootScope) {

    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();
    $ionicLoading.show({ templateUrl: "templates/loading.html" });
    localStorage.clear();

    var appInfo = {};
    var location = {};

    checkAppInfo();

    function checkAppInfo() {

        var hasAppInfo = checkLocalStorage("appInfo");
        if (!hasAppInfo) {
            initialiseAppInfo();
            initialiseLocation();
        }
        checkAppStatus();
    }

    function checkAppStatus() {
        var checkNewUser = checkLocalStorage('appStatus');
        if (checkNewUser) {
            firebase.database().ref('appStatus').once('value', function(snapshot) {
                var newStatus = snapshot.val();
                var currentStatus = JSON.parse(window.localStorage['appStatus']);
                if (newStatus.live == true) {
                    if (newStatus.version > currentStatus.version) {
                        $ionicLoading.hide();
                        $state.go('app-update');
                    } else {
                        checkLoginStatus();
                    }
                } else {
                    $ionicLoading.hide();
                    $state.go('under-construction');
                }
            });
        } else {
            firebase.database().ref('appStatus').once('value', function(snapshot) {
                var newStatus = snapshot.val();
                if (newStatus.live == false) {
                    $ionicLoading.hide();
                    $state.go('under-construction');
                } else {
                    $ionicLoading.hide();
                    $state.go('intro-slider');
                }
            });
        }
    }

    function checkLoginStatus() {
        var checkLogin = checkLocalStorage('userUid');
        if (checkLogin) {
            $ionicLoading.hide();
            $state.go('app.home');
        } else {
            $ionicLoading.hide();
            $state.go('signup')
        }
    }

    function initialiseAppInfo() {
        try {
            var date = new Date();
            var currTimeStamp = date.getTime();
            appInfo = {
                udid: '',
                uuid: currTimeStamp,
                os: '',
                platform: '',
                version: '',
                model: '',
                manufacture: '',
                deviceToken: 0,
                error: '',
                timeStamp: currTimeStamp
            };
        } catch (e) {}
        registerDevice();
    }

    function registerDevice() {
        if (window.cordova) {
            try {
                var deviceInformation = $cordovaDevice.getDevice();
                appInfo.udid = deviceInformation.serial;
                appInfo.uuid = deviceInformation.uuid;
                appInfo.os = "1";
                appInfo.platform = deviceInformation.platform;
                appInfo.version = deviceInformation.version;
                appInfo.model = deviceInformation.model;
                appInfo.manufacture = deviceInformation.manufacturer;
                firebase.database().ref('deviceInformation/' + appInfo.uuid).update(appInfo).then(function() {});

            } catch (e) {
                appInfo.error = e.message;
                var newPostKey = firebase.database().ref().child('deviceInformation').push().key;
                firebase.database().ref('deviceInformation/notRegistered/' + newPostKey).update(appInfo).then(function() {});
            };
            window.localStorage['appInfo'] = JSON.stringify(appInfo);
        } else {
            appInfo.error = "not cordova";
            var newPostKey = firebase.database().ref().child('deviceInformation').push().key;
            firebase.database().ref('deviceInformation/notRegistered/' + newPostKey).update(appInfo).then(function() {});
            window.localStorage['appInfo'] = JSON.stringify(appInfo);
        }
    }

    function initialiseLocation() {
        try {
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
        } catch (e) {}
        window.localStorage['selectedLocation'] = JSON.stringify(location);
    }

});
