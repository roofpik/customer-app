app
.controller('IntroSliderCtrl', ['$scope', '$ionicSlideBoxDelegate', '$state', function($scope,$ionicSlideBoxDelegate,$state) {

    $scope.skipSlide = function(){
       // $state.go('appStatus');
       $state.go('signup');
    }
    $scope.nextSlide = function(){
        console.log($ionicSlideBoxDelegate.currentIndex());
        if($ionicSlideBoxDelegate.currentIndex()<3){
            $ionicSlideBoxDelegate.next();
        }else{
           // $state.go('appStatus');
            $state.go('signup');
        }
    }

    $scope.slideChanged = function(){

        if($ionicSlideBoxDelegate.currentIndex()<4){
           console.log($ionicSlideBoxDelegate.currentIndex());
        }
        else{
          //  $state.go('appStatus');
          $state.go('signup');
        }

    }
}]);