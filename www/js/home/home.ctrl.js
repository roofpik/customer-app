app.controller('HomeCtrl', function($scope, $state, $ionicLoading, $timeout , $ionicScrollDelegate) {
   $scope.data = {};
   $ionicLoading.show({
      template: 'Loading...'
    });

    $timeout(function () {
      $ionicLoading.hide();
      $ionicScrollDelegate.resize();
   }, 2000);
   

});


