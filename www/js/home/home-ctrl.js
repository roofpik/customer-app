app.controller('HomeCtrl', function($scope, $state, $http, $ionicPopup, $timeout, $ionicLoading, $ionicModal) {
 console.log('home page');
 $scope.data = {};
 $ionicLoading.show({
    template: 'Loading...'
  });

  $timeout(function () {
    $ionicLoading.hide();
   }, 8000);

  localStorage.removeItem('results');

  $scope.uid = window.localStorage.getItem("userUid");
  console.log($scope.uid);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    // console.log(user.email);
      var users = db.ref("users/data/"+$scope.uid);
      users.once("value", function(snapshot){
        console.log(snapshot.val());
        if(snapshot.val() != null){
          console.log(snapshot.val().userId, $scope.uid);
          console.log("object present");
          $ionicLoading.hide();
        }
        else{
          console.log("object not present");
          // customPopup();
          // $state.go("check-user-entry");
        }
      });
    } else {
      console.log("no user");
    }
  });

  $scope.goToNearby = function(){
    $state.go('nearby-projects', {});
  }

  $scope.goToProjectSearch = function(val){
    console.log(val);
    if(!checkLocalStorage('selectedLocation')){
      $ionicPopup.alert({
         title: "Location Not Selected",
         template: "Please select a location first"
      }).then(function(){
         $state.go('select-location');
      });
    } else {
      if(val == 1){
         $state.go('project-search', {type:'search'});
      } else {
         $state.go('project-search', {type:'review'});
      }  
    }
  }

  $ionicModal.fromTemplateUrl('templates/properties/buy-rent-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.buyRent = '';

  $scope.selectBuyOrRent = function(e, value){
    console.log(e, value);
    $scope.buyRent= value;
    console.log($scope.buyRent);
    $scope.modal.hide();
    $state.go('properties', {buyOrRent: $scope.buyRent, from: 2});
  }


  $ionicModal.fromTemplateUrl('templates/filters/nearby-edit.html', {
    id: '1',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal1 = modal;
  });

  $scope.openNearby = function() {
    $scope.modal1.show();
  };

  $scope.cancelNearbyFilters = function() {
    console.log("Cancel filters...");
    $scope.modal1.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal1.remove();
  });


  $scope.selectedNearByDistance = true;
  $scope.selectedNearByTime = false;
  $scope.selectedDistanceValue = 1;
  $scope.selectedTimeValue = 5;

  $scope.selectDistance = function() {
    $scope.selectedNearByDistance = true;
    $scope.selectedNearByTime = false;
    console.log("Distance");
  }
  $scope.selectTime = function() {
    $scope.selectedNearByDistance = false;
    $scope.selectedNearByTime = true;
    console.log("Time");
  }

  $scope.addDistanceTime = function() {
    if($scope.selectedNearByDistance) {
      $scope.selectedDistanceValue++;
    }else if($scope.selectedNearByTime) {
      $scope.selectedTimeValue+=5;
    }
  }

  $scope.minusDistanceTime = function() {
    if($scope.selectedNearByDistance&&$scope.selectedDistanceValue>0) {
      $scope.selectedDistanceValue--;
    }else if($scope.selectedNearByTime&&$scope.selectedTimeValue>0) {
      $scope.selectedTimeValue-=5;
    }
  }

  var loc = JSON.parse(localStorage.getItem('allnearbyLocations'));
  $scope.locationSuggestions = [];

  angular.forEach(loc, function(element){
    $scope.locationSuggestions.push(element);
  });


  $scope.suggestProjectByLocation = function(input) {
    $scope.suggestedLocationSelected = false;
    if(input.loc==""){
      $scope.suggestedLocationSelected = true;
      $scope.showApply=false;
    }
  }
  $scope.selectedProjectLocation = {};
  $scope.suggestedLocationSelected = true;
  $scope.showApply=false;


  $scope.selectedNearByLocation = function(suggestedLocation) {
    console.log(suggestedLocation);
    $scope.suggestedLocationSelected = true;
    // console.log($scope.selectedProjectLocation);
    $scope.selectedNearbyFilterId = suggestedLocation.nearbyId;
    $scope.showApply=true;
    $timeout(function(){
      $scope.selectedProjectLocation.loc = suggestedLocation.name;
    },50);
  }

  var dist = JSON.parse(localStorage.getItem('allnearbyDistances'));

  console.log(dist);

  $scope.nearbyDistanceTime = {};
  $scope.nearbyDistanceTimeFound = []; // found value of all nearby projects
  $scope.nearbyDistanceTime = dist;
  $scope.nearbyDistanceTimeSelected = false;
     
  $scope.applyNearbyFilters = function(peak) {
    console.log("Applying filters...");
    $scope.nearbyDistanceTimeSelected = true;
    var nearbyInMeters = $scope.selectedDistanceValue*1000;
    var nearbyInSeconds = $scope.selectedTimeValue*60;
    var locId = $scope.selectedNearbyFilterId;
    console.log($scope.nearbyDistanceTime);

    if($scope.selectedNearByDistance) {
      angular.forEach($scope.nearbyDistanceTime[locId].residential, function(v, k){
        // console.log(v,k);
        if(v['off-peak']!=undefined) {
          if(v['off-peak'].distance!=undefined) {
            console.log(v['off-peak'].distance,nearbyInMeters );
              if(v['off-peak'].distance<nearbyInMeters){
                // console.log("Found");
                $scope.nearbyDistanceTimeFound.push(k);
              }
          }
        }
        if(v['peak']!=undefined) {
          if(v['peak'].distance!=undefined) {
            console.log(v['peak'].distance, nearbyInMeters);
            if(v['peak'].distance<nearbyInMeters){
              // console.log("Found");
              $scope.nearbyDistanceTimeFound.push(k);
            }
          }
        }
      });
    }else if($scope.selectedNearByTime) {
      angular.forEach($scope.nearbyDistanceTime[locId].residential, function(v, k){
        console.log(v,k);
        if(v['peak']!=undefined) {
          if(v['peak'].duration!=undefined) {
            console.log(v['peak'].duration, nearbyInSeconds);
            if(v['peak'].duration<nearbyInSeconds){
              // console.log("Found");
              $scope.nearbyDistanceTimeFound.push(k);
            }
          }
        }
        if(v['off-peak']!=undefined) {
          if(v['off-peak'].duration!=undefined) {
            console.log(v['off-peak'].duration, nearbyInSeconds);
            if(v['off-peak'].duration<nearbyInSeconds){
              // console.log("Found");
              $scope.nearbyDistanceTimeFound.push(k);
            }
          }
        }   
      });
    }

    // var a = ["1", "1", "2", "3", "3", "1"];
    var unique = $scope.nearbyDistanceTimeFound.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
    console.log(unique);
    window.localStorage['filteredProjectList'] = JSON.stringify(unique);
    $state.go('properties', {buyOrRent:'buy', from : 1});
    $scope.modal1.hide();
  };
});

function checkLocalStorage(item){
   if (localStorage.getItem(item) === null ||  typeof window.localStorage[item] === 'undefined') {
      return false
   }
   else{
   	return true
   }
}
