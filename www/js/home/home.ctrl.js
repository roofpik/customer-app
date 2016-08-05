app.controller('HomeCtrl', function($scope, $state, $ionicLoading, $timeout) {
   $scope.data = {};
   $ionicLoading.show({
      template: 'Loading...'
    });

    $timeout(function () {
      $ionicLoading.hide();
   }, 2000);
   

});


