app.factory("AuthenticationService", function($http, $ionicPopup, $location, $timeout, $state, $ionicHistory, $ionicLoading){
   var service = {};
   service.LoginEmail = LoginEmail;
   service.LoginGmail = LoginGmail;
   service.Logout = Logout;
   service.checkAuthentication = checkAuthentication;

   return service;

   function LoginEmail(email, password, callback){
      console.log(email, password);
      $ionicLoading.show();
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
         console.log(user);
         console.log('uid',user.uid);
         console.log("success login");
         db.ref().child("users").child("data").child(user.uid).on("value", function(snapshot){
            console.log(snapshot.val().name);
            window.localStorage.setItem("userName", snapshot.val().name);
            if(user.displayName === null){
               user.updateProfile({
                 displayName: snapshot.val().name,
               }).then(function() {
                  console.log("name Successfully set");
               }, function(error) {
                  console.log("error in setting name");
               });
            }
         });

         window.localStorage.setItem("userEmail", email);
         window.localStorage.setItem("userUid", user.uid);
         $timeout(function(){
            $ionicLoading.hide();
            $state.go('app.home');
            
         }, 0);
      }).catch(function(error) {
         $ionicLoading.hide();
         $ionicPopup.alert({
            title: "Authentication Error",
            template: error.message
         });
      });
   }

   function LoginGmail(){
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/plus.login');
      firebase.auth().signInWithPopup(provider).then(function(result) {
         var token = result.credential.accessToken;
         var user = result.user;
         console.log(user);
         console.log(user.uid);
         console.log(user.email);
         window.localStorage.setItem("userEmail", user.email);
         window.localStorage.setItem("userUid", user.uid);
         console.log(window.localStorage);
         $timeout(function () {
            $state.go("app.home");
         }, 0);
      }).catch(function(error) {
         console.log(error);
         console.log("error in google signin");
      });
   }

   function Logout(){
      console.log("Successfully logged out");
      console.log(window.localStorage);
      firebase.auth().signOut().then(function() {
         console.log('Sign-out successful.');
         delete window.localStorage.userUid;
         delete window.localStorage.userEmail;
         delete window.localStorage.userName;
         delete window.localStorage.currentProject;
         delete window.localStorage.currentChannel;
         $ionicHistory.clearHistory();
         $ionicHistory.clearCache();
         console.log("Successfully deleted from localStorage");
      }, function(error) {
         console.log("error", error);
      });
   }

   function checkAuthentication(){
      firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
            console.log("yes login");
            console.log(user);
            console.log(user.uid);
         } else {
            console.log("no login");
            $location.path("/login");
         }
      });
   }
});
