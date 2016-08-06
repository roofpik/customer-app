app.controller('PropertiesCtrl', function($state,$scope, $timeout, $stateParams, $ionicModal, $ionicLoading, $ionicHistory) {

   $ionicLoading.show({
      template: 'Loading...'
   })

   $timeout(function(){
      $ionicLoading.hide();
   }, 1000);

   // console.log($stateParams);
   $scope.location = JSON.parse(window.localStorage['selectedLocation']|| {}).cityName;

   $scope.allProjects = JSON.parse(window.localStorage['allDisplayData'] || {});
   var hasFilteredPropertyList = checkLocalStorage('filteredProjectList');
   // console.log(hasFilteredPropertyList);
   // console.log(JSON.parse(window.localStorage['filteredProjectList']));
   if(hasFilteredPropertyList){
      $scope.projectList = JSON.parse(window.localStorage['filteredProjectList'] || {});
      // console.log($scope.projectList);
   }

   $scope.resultsfound = 0;
   $scope.results= [];

   angular.forEach($scope.allProjects, function(value, key){
      // console.log(value);
      if($stateParams.from == 1){
         value.showInList = true;
         $scope.resultsfound++;
         if((value.buyMin == 0) || (value.buyMax ==0)){
            value.showBuyRange = false;
         } else {
            value.showBuyRange = true;
            var rangeBuy = convertCurrency(value.buyMin, value.buyMax);
            value.rangeBuy = rangeBuy;
         }
         if((value.rentMin == 0) || (value.rentMax ==0)){
            value.showRentRange = false;
         } else {
            value.showRentRange = true;
            var rangeRent = convertCurrency(value.rentMin, value.rentMax);
            value.rangeRent = rangeRent;
         }
         // console.log(value);
         $scope.results.push(value);
      } else if($stateParams.from == 2){
         // console.log(value.showInList);
         if(value.showInList == undefined){
            for(x in $scope.projectList){
               // console.log(value.projectId, $scope.projectList[x]);
               if(value.projectId == $scope.projectList[x]){
                  value.showInList = true;
                  $scope.resultsfound++;
               }
            }
            if(value.showInList == undefined){
               value.showInList = false;
            }
         }
         if((value.buyMin == 0) || (value.buyMax ==0)){
            value.showBuyRange = false;
         } else {
            value.showBuyRange = true;
            var rangeBuy = convertCurrency(value.buyMin, value.buyMax);
            value.rangeBuy = rangeBuy;
         }
         if((value.rentMin == 0) || (value.rentMax ==0)){
            value.showRentRange = false;
         } else {
            value.showRentRange = true;
            var rangeRent = convertCurrency(value.rentMin, value.rentMax);
            value.rangeRent = rangeRent;
         }
         $scope.results.push(value);
      }else {
         // console.log($stateParams.from == 2);
      }
   });

   function convertCurrency(value1, value2){
      value1Len = getlength(value1);
      value2Len = getlength(value2);
      var denomination = '';

      if(value2Len <= 5){
         denomination = ' K';
         value1 = value1/1000;
         value1 = parseFloat((value1).toFixed(2));
         value2 = value2/1000;
         value2 = parseFloat((value2).toFixed(2));
         range = value1+denomination + ' - '+value2+denomination;
      } else if(value2Len> 5 && value2Len <= 7){
         denomination = ' L';
         value1 = value1/100000;
         value1 = parseFloat((value1).toFixed(2));
         value2 = value2/100000;
         value2 = parseFloat((value2).toFixed(2));
         range = value1+denomination + ' - '+value2+denomination;
      } else if(value2Len> 7 && value2Len <= 9){
         denomination = ' Cr';
         value1 = value1/10000000;
         value1 = parseFloat((value1).toFixed(2));
         value2 = value2/10000000;
         value2 = parseFloat((value2).toFixed(2));
         range = value1+denomination + ' - '+value2+denomination;
      }
      return range;
   }

   function getlength(number) {
       return number.toString().length;
   }

    $scope.starrating=function(rating)
   {
      rating = Math.round(rating);
      return new Array(rating);   //ng-repeat will run as many times as size of array

   }

   $scope.selectProject = function(value){
      console.log(value);
      $state.go('projectDetails.overview', {projectId:value.projectId});
   }

   $scope.goToHome = function(){
      $ionicHistory.goBack();
   }

});
