app.controller("SignupCtrl", function($scope, $http, $ionicPopup, $ionicHistory, $ionicLoading, $state, $filter) {

    $scope.user = {};
    try {
        $scope.deviceId = JSON.parse(localStorage.appInfo).uuid;
        $scope.device = "cordova";
    } catch (e) {
        $scope.deviceId = "na";
        $scope.device = "notCordova";
    }

    $scope.user = {
        name: '',
        email: '',
        mobileNum: '',
        referralCode: '',
        deviceId: $scope.deviceId,
        device: $scope.device,
        message: '',
        statusCode: ''
    }

    $scope.signup = function() {
        $ionicLoading.show();
        var newPostKey = db.ref().child('userRegisterLog').push().key;
        var date = new Date();
        var today = $filter('date')(date, 'dd-MM-yy');
        $http.post("http://139.162.3.205/api/addUser", $scope.user)
            .success(function(response) {
                console.log(response);
                $ionicLoading.hide();
                if (response.StatusCode == '400') {
                    $scope.user.statusCode = response.StatusCode;
                    $scope.user.message = response.Message;
                    db.ref('userRegisterLog/code400/' + today + '/' + newPostKey).update($scope.user);
                    $ionicPopup.alert({
                        title: "Error Occured",
                        template: response.Message
                    });
                } else if (response.StatusCode == '200') {
                    $scope.user.statusCode = response.StatusCode;
                    $scope.user.message = response.Message;
                    db.ref('userRegisterLog/code200/' + today + '/' + newPostKey).update($scope.user);
                    $scope.user = {};
                    $ionicPopup.alert({
                        title: "Message",
                        template: response.Message
                    });
                }
                else{
                     $scope.user.statusCode = '500';
                    $scope.user.message = response.Message;
                    db.ref('userRegisterLog/code500/' + today + '/' + newPostKey).update($scope.user);
                }
            })
            .error(function(response) {
                $ionicLoading.hide();
                $scope.user.statusCode = '600';
                $scope.user.message = response.Message;
                db.ref('userRegisterLog/error/' + today + '/' + newPostKey).update($scope.user);
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: "Authentication Error",
                    template: response.Message
                });
            });
    }

    $scope.goToLogin = function() {
        $state.go('login');
    }

    $scope.goToHome = function(){
      $state.go('app.home');
   }

});
