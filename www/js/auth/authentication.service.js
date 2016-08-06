app.factory("AuthenticationService", function($http, $ionicPopup, $location, $timeout, $state, $ionicHistory, $ionicLoading, $filter) {
    var service = {};
    service.LoginEmail = LoginEmail;
    // service.LoginGmail = LoginGmail;
    service.Logout = Logout;
    service.checkAuthentication = checkAuthentication;

    return service;

    function LoginEmail(email, password, callback) {
        $ionicLoading.show();
        var date = new Date();
        var timeStamp = date.getTime();
        var today = $filter('date')(date, 'dd-MM-yy');
        var appInfo = JSON.parse(window.localStorage['appInfo']);
        var newPostKey = db.ref().child('userLogin').push().key;
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
            db.ref().child("users").child("data").child(user.uid).on("value", function(snapshot) {
                console.log(snapshot.val());
             //   window.localStorage['userName'] = JSON.stringify(snapshot.val().name);
                window.localStorage.setItem("userName", snapshot.val().name);
                console.log(window.localStorage.getItem('userName'));
                window.localStorage.setItem("userEmail", email);
                window.localStorage.setItem("userUid", user.uid);
                var userlogin = {
                    name: snapshot.val().name,
                    email: email,
                    userid: user.uid,
                    time: timeStamp,
                    deviceId: appInfo.uuid,
                    device: appInfo.device
                }
                db.ref('userLogin/success/' + user.uid + '/' + today + '/' + newPostKey).update(userlogin);
            });
            $timeout(function() {
                $ionicLoading.hide();
                // $ionicHistory.clearHistory();
                // $ionicHistory.clearCache();
                $state.go('landing');
            }, 0);
        }).catch(function(error) {
            $ionicLoading.hide();
            var userlogin = {
                email: email,
                time: timeStamp,
                deviceId: appInfo.uuid,
                device: appInfo.device,
                error: error.message
            }
            db.ref('userLogin/fail/' + appInfo.uuid + '/' + today + '/' + newPostKey).update(userlogin);
            $ionicPopup.alert({
                title: "Authentication Error",
                template: error.message
            });
        });
    }

    // function LoginGmail(){
    //    var provider = new firebase.auth.GoogleAuthProvider();
    //    provider.addScope('https://www.googleapis.com/auth/plus.login');
    //    firebase.auth().signInWithPopup(provider).then(function(result) {
    //       var token = result.credential.accessToken;
    //       var user = result.user;
    //       console.log(user);
    //       console.log(user.uid);
    //       console.log(user.email);
    //       window.localStorage.setItem("userEmail", user.email);
    //       window.localStorage.setItem("userUid", user.uid);
    //       console.log(window.localStorage);
    //       $timeout(function () {
    //          $state.go("app.home");
    //       }, 0);
    //    }).catch(function(error) {
    //       console.log(error);
    //       console.log("error in google signin");
    //    });
    // }

    function Logout() {
        firebase.auth().signOut().then(function() {
            console.log('Sign-out successful.');
            delete window.localStorage.userUid;
            delete window.localStorage.userEmail;
            delete window.localStorage.userName;
            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();
        }, function(error) {});
    }

    function checkAuthentication() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {

            } else {
                $ionicPopup.alert({
                    title: "Not Logged In",
                    template: "Please login first to view the content"
                }).then(function() {
                    $ionicHistory.clearHistory();
                    $ionicHistory.clearCache();
                    $state.go("signup");
                });

            }
        });
    }
});
