app.controller('referCtrl', function($scope, $ionicHistory, $timeout, $ionicLoading ,$cordovaSocialSharing){

  $ionicLoading.show();

  $scope.backRoute = function(){
    $ionicHistory.goBack();
  }

  var uid = window.localStorage.getItem("userUid");

  db.ref("users/data/"+uid).once("value", function(snapshot){
    $timeout(function(){

      $scope.userReferralCode = snapshot.val().myReferralCode;
      $ionicLoading.hide();

    }, 50)
    
  });

  screenWidth = window.screen.width;
  screenHeight= window.screen.height - 44;


  $('.referimage1').css('height', screenHeight*0.5);
  $('.referral-share').css('height', screenHeight*0.4);
  $('.referimage2').css('height', screenHeight*0.3);
  $timeout(function(){
    leftmargin = (screenWidth - document.getElementById('referimage2').clientWidth)/2;
    $('.referimage2').css('left', leftmargin);

    $('.btn-share').css('left', (leftmargin/2 + (document.getElementById('referimage2').clientWidth)/2 - ($('.btn-share').width())));
    $('.refer-code').css('left', (leftmargin/2 + (document.getElementById('referimage2').clientWidth)/2 - ($('.btn-share').width())));

    var position = $('.referimage2').position().top;
    var img2height = document.getElementById('referimage2').clientHeight;
    var btnShareHeight = $('.btn-share').height();

    var btnPosition = position+img2height-btnShareHeight/2 -10;
    $('.refer-code').css('top', btnPosition - img2height/2.5)
    $('.btn-share').css('top', btnPosition);

  },500);




     $scope.OtherShare=function(){
       window.plugins.socialsharing.share('Join Roofpik using the  ',
        null, null, 'http://roofpik.com/app/');
    }


});
