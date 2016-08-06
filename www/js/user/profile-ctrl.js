app.controller("profileCtrl", ['$scope', '$timeout', '$ionicLoading', '$cordovaCamera', '$http', '$ionicPopup', '$state', function($scope, $timeout, $ionicLoading, $cordovaCamera, $http, $ionicPopup, $state) {
    $ionicLoading.show({
        template: 'Loading'
    });

    $scope.myGoBack = function() {
        $state.go('app.home');
    }

    $timeout(function() {
        $ionicLoading.hide();
    }, 2000);

    $scope.showMobileVerify = false;
    $scope.showOTPfield = false;

    $scope.newOtp = {
        code: ''
    }
    var storedOTP = [];


    if (checkLocalStorage('previousOtp')) {
        $scope.showOTPfield = true;
        $scope.showMobileVerify = true;
        storedOTP = JSON.parse(window.localStorage['previousOtp'] || {});
    } else {}
    var uid = window.localStorage.uid;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            $scope.uid = window.localStorage.userUid;
            // $scope.email = window.localStorage.email;
            var ref = db.ref("users/data/" + $scope.uid);
            ref.on("value", function(snapshot) {
                if (snapshot.val().mobile.mobileFlag == false) {
                    $scope.showMobileVerify = true;
                } else {
                    $scope.showMobileVerify = false;
                    $scope.showOTPfield = false;
                }
                $timeout(function() {
                    $scope.val = snapshot.val();
                    if (snapshot.val().photoUrl) {
                        $(".profile-pic").css("display", 'none');
                        document.getElementById("myImage").src = snapshot.val().photoUrl;
                    } else {
                        $scope.img_hash = md5($scope.uid);
                        jdenticon.update("#identicon", $scope.img_hash);
                    }
                    $ionicLoading.hide();
                }, 0);
            });

            $scope.galleryUpload = function() {

                var options = {
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY, //, Camera.PictureSourceType.CAMERA,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    popoverOptions: CameraPopoverOptions,
                };

                $cordovaCamera.getPicture(options).then(function(imageURI) {
                    var image = document.getElementById('myImage');
                    image.src = imageURI;
                    $scope.url = imageURI;

                    resizeImage(imageURI);

                }, function(err) {});
            };

            $scope.cameraUpload = function() {

                var options = {
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    popoverOptions: CameraPopoverOptions,
                };

                $cordovaCamera.getPicture(options).then(function(imageURI) {
                    var image = document.getElementById('myImage');
                    image.src = imageURI;
                    $scope.url = imageURI;
                    alert(JSON.stringify(imageURI) + 'line number 283, imageURI');

                    resizeImage(imageURI);

                }, function(err) {});
            };

            function resizeImage(source) {
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");

                img = new Image();
                img.onload = function() {
                    canvas.height = canvas.width * (img.height / img.width);
                    /// step 1
                    var oc = document.createElement('canvas');
                    var octx = oc.getContext('2d');
                    oc.width = img.width * 0.5;
                    oc.height = img.height * 0.5;
                    octx.drawImage(img, 0, 0, oc.width, oc.height);
                    /// step 2
                    octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);
                    ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5, 0, 0, canvas.width, canvas.height);
                    var dataURL = canvas.toDataURL("image/jpeg");

                    $http.post("http://139.162.3.205/api/testupload", { path: dataURL })
                        .success(function(response) {

                            var updates1 = {};
                            updates1["users/data/" + $scope.uid + "/photoUrl"] = response.Message;
                            db.ref().update(updates1).then(function() {
                                user.updateProfile({
                                    photoURL: response.Message
                                }).then(function() {
                                    $(".profile-pic").css("display", 'none');
                                });
                            });

                        })
                        .error(function(response) {
                            $("#myImage").css("display", 'none');
                        });
                }
                img.src = source;
                $(".profile-pic").css("display", 'none');
            }

        } else {
            $state.go("login");
        }
    });

    $scope.sendVerification = function() {
        $ionicLoading.show({
            template: 'Loading...'
        });
        $http({
            url: 'http://139.162.3.205/api/sendOtp',
            method: 'POST',
            params: {
                mobno: $scope.val.mobile.mobileNum
            }
        }).success(function(response) {
            $ionicLoading.hide();
            if (response.StatusCode == 200) {
                $scope.otp = response.OTP;
                storedOTP.push($scope.otp);
                window.localStorage['previousOtp'] = JSON.stringify(storedOTP);
                $ionicPopup.alert({
                    title: 'Verification Code Sent',
                    template: 'We have sent a verification code to your registered mobile number'
                }).then(function() {
                    $scope.showOTPfield = true;
                })
            } else {
                $ionicPopup.alert({
                    title: 'Verification Code not sent',
                    template: 'An error occurred. Please try again later.'
                });
            }
        })
    }

    $scope.verifyOTP = function() {
        var verified = false;
        for (var i = 0; i < storedOTP.length; i++) {
            if ($scope.newOtp.code == parseInt(storedOTP[i])) {
                db.ref("users/data/" + $scope.uid + '/mobile/mobileFlag').set(true).then(function() {
                    verified = true;
                    $ionicPopup.alert({
                        title: 'Mobile Number Verified'
                    })
                });

            }
        }
        $timeout(function() {
            if (i == storedOTP.length && !verified) {
                $ionicPopup.alert({
                    title: 'Incorrect Code'
                }).then(function() {
                    $scope.newOtp = {
                        code: ''
                    }
                })
            }
        }, 1000);
    }


}]);
