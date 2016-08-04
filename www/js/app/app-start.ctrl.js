app.controller('appLandingCtrl', function($scope, $timeout, $ionicLoading, $state, $cordovaDevice, $cordovaNetwork, $ionicPopup, $rootScope) {

    localStorage.clear();
    console.log("cleared Local Storage");



    $ionicLoading.show({ templateUrl: "templates/loading.html" });
    var appInfo = {};
    var location = {};
    checkAppInfo();

    function checkAppInfo() {
        console.log("app Info called");
        var hasAppInfo = checkLocalStorage("appInfo");
        if (!hasAppInfo) {
            console.log("app info not available");
            initialiseAppInfo();
            initialiseLocation();
        }
        checkAppStatus();
    }

    function checkAppStatus() {
        console.log("checkAppStatus");
        var checkNewUser = checkLocalStorage('appStatus');
        if (checkNewUser) {
            console.log('old user');
            db.ref('appStatus').once('value', function(snapshot) {
                var newStatus = snapshot.val();

                var currentStatus = JSON.parse(window.localStorage['appStatus']);

                //   window.localStorage['appStatus'] = JSON.stringify(snapshot.val());
                console.log('newstatus', newStatus);
                console.log('currentstatus', currentStatus);
                if (newStatus.live == true) {
                 //   updateAppStatus(snapshot.val());
                    console.log("app is live");

                    if (newStatus.version > currentStatus.version) {
                        console.log("new version is available");
                        // if (newStatus.locationVersion > currentStatus.locationVersion) {

                        //     updateLocationData();
                        // }
                        // if (newStatus.nearbyVersion > currentStatus.nearbyVersion) {

                        //     updateNearbyData();
                        // }
                        // if (newStatus.projectVersion > currentStatus.projectVersion) {

                        //     updateProjectData();
                        // }
                        $ionicLoading.hide();
                       
                        $state.go('update');
                    } else {
                        //Checks

                        // if (newStatus.locationVersion > currentStatus.locationVersion) {

                        //     updateLocationData();
                        // }
                        // if (newStatus.nearbyVersion > currentStatus.nearbyVersion) {

                        //     updateNearbyData();
                        // }
                        // if (newStatus.projectVersion > currentStatus.projectVersion) {

                        //     updateProjectData();
                        // }
                        checkLoginStatus();
                    }
                } else {
                    console.log("app is not live");
                    $ionicLoading.hide();
                    $state.go('underconstruction');
                }
            });
        } else {
            console.log("new user");
            db.ref('appStatus').once('value', function(snapshot) {
                var newStatus = snapshot.val();
                if (newStatus.live == false) {
                    console.log("app is not live");
                    $ionicLoading.hide();
                    $state.go('underconstruction');
                } else {
                    console.log("app is live");
                  //  updateAppStatus(snapshot.val());
                    // updateLocationData();
                    // console.log()
                    // updateNearbyData();
                    // updateProjectData();
                    $ionicLoading.hide();
                    $state.go('intro-slider');
                }
            });
        }
    }


    // function updateLocationData() {
 //     console.log('new location data');
 //     db.ref('location/' + location.cityId).once('value', function(data) {
 //         window.localStorage['allLocations'] = JSON.stringify(data.val());
 //     })
 // }

 // function updateNearbyData() {
 //     console.log('new nearby data');
 //     db.ref('nearby/' + location.cityId).once('value', function(data) {
 //         window.localStorage['allnearbyLocations'] = JSON.stringify(data.val());
 //     });

 //     db.ref('nearbyDistance/' + location.cityId).once('value', function(data2) {
 //         window.localStorage['allnearbyDistances'] = JSON.stringify(data2.val());
 //     });
 // }

 // function updateProjectData() {
 //     console.log('new project data');
 //     db.ref('projects/' + location.cityId + '/residential').once('value', function(data) {
 //         window.localStorage['allProjectsData'] = JSON.stringify(data.val());
 //     });

 //     db.ref('projectDisplayData/' + location.cityId + '/residential').once('value', function(data2) {
 //         window.localStorage['allDisplayData'] = JSON.stringify(data2.val());
 //     });
 // }


    function checkLoginStatus() {
        var checkLogin = checkLocalStorage('userUid');
        if (checkLogin) {
            $ionicLoading.hide();
            //$state.go('app.home')
        } else {
            $ionicLoading.hide();
            $state.go('signup')
        }
    }

    function initialiseAppInfo() {
        console.log('initialiseAppInfo');
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
        registerDevice();
    }

    function registerDevice() {
        console.log('registerDevice');
        try {
            var deviceInformation = $cordovaDevice.getDevice();
            appInfo.udid = deviceInformation.serial;
            appInfo.uuid = deviceInformation.uuid;
            appInfo.os = "1";
            appInfo.platform = deviceInformation.platform;
            appInfo.version = deviceInformation.version;
            appInfo.model = deviceInformation.model;
            appInfo.manufacture = deviceInformation.manufacturer;
            db.ref('deviceInformation/' + appInfo.uuid).update(appInfo).then(function() {});
        } catch (e) {
            appInfo.error = e.message;
            var newPostKey = db.ref().child('deviceInformation').push().key;
            db.ref('deviceInformation/notRegistered/' + newPostKey).update(appInfo).then(function() {});
        };
        window.localStorage['appInfo'] = JSON.stringify(appInfo);
        // console.log('appInfo: ', appInfo);
    }

    function initialiseLocation() {
        console.log('initialiseLocation');
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
        // console.log(location);
    }

});
