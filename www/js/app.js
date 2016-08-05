// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'ngCordova'])

app.run(function($ionicPlatform, $cordovaNetwork, $rootScope, $interval, $state, $ionicHistory) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        document.addEventListener("deviceready", function() {

            var type = $cordovaNetwork.getNetwork()

            var isOnline = $cordovaNetwork.isOnline();
            if (!isOnline) {
                 $state.go('network');
            }

            // listen for Online event
            $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
                $ionicHistory.goBack();
            })

            // listen for Offline event
            $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
                $state.go('network');
            })

        }, false);

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

var db = firebase.database();

function checkLocalStorage(item) {
    if (localStorage.getItem(item) === null || typeof window.localStorage[item] === 'undefined') {
        return false
    } else {
        return true
    }
}
