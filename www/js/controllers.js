angular.module('starter.controllers', [])

app.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

app.controller('PlaylistsCtrl1', function($scope) {


  // var test = {
  //   'a': 'arpit'
  // }

  //  // Get a key for a new Post.
  // var newPostKey = db.ref().child('test').push().key;
  // var updates = {};
  // updates['/test/' + newPostKey] = test;
  // db.ref().update(updates);
})

// app.controller('PlaylistCtrl', function($scope, $stateParams) {


// });



app.controller('PlaylistsCtrl', function($scope, $timeout, $ionicLoading, $state, $cordovaDevice, $cordovaNetwork, $ionicPopup, $rootScope) {
      $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

    localStorage.clear();
    console.log("cleared Local Storage");
    $ionicLoading.show();
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
      console.log("checkAppStatus");
        var checkNewUser = checkLocalStorage('appStatus');
        if (checkNewUser) {
            db.ref('appStatus').once('value', function(snapshot) {
                var newStatus = snapshot.val();
                var currentStatus = JSON.parse(window.localStorage['appStatus']);
                window.localStorage['appStatus'] = JSON.stringify(snapshot.val())
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
                        if (newStatus.projectVersion > currentStatus.projectVersion) {
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
          console.log("checkAppStatus Else");
          db.ref('appStatus').once('value', function(snapshot) {
                var newStatus = snapshot.val();
            if (newStatus.live == false) {
                $ionicLoading.hide();
                //$state.go('underconstruction');
            } else {
                db.ref('appStatus').once('value', function(snapshot) {
                    window.localStorage['appStatus'] = JSON.stringify(snapshot.val())
                })
                updateLocationData();
                console.log()
                updateNearbyData();
                updateProjectData();
                $ionicLoading.hide();
                
            }
          });
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
            appInfo.error = e;
            var newPostKey = db.ref().child('deviceInformation').push().key;
            db.ref('deviceInformation/notRegistered/' + newPostKey).update(appInfo).then(function() {});
        };
        window.localStorage['appInfo'] = JSON.stringify(appInfo);
        
        console.log("Registered Device");
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
        console.log("Location Initialised");
    }

});

