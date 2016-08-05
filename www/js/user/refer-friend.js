app.controller('referFriendCtrl', function($scope, $cordovaSocialSharing){

	$scope.whatsappShare=function(){
      window.plugins.socialsharing.shareViaWhatsApp(' Use this referral code to get Rs. 50 in your FAB2U wallet. ',
       null /* img */, "https://www.fab2u.com" /* url */, null, function(errormsg){alert("Error: Cannot Share")});
    }
     $scope.twitterShare=function(){
      window.plugins.socialsharing.shareViaTwitter(' Use this referral code to get Rs. 50 in your FAB2U wallet. ',
       null /* img */, 'https://www.fab2u.com', null, function(errormsg){alert("Error: Cannot Share")});
    }
     $scope.OtherShare=function(){
       window.plugins.socialsharing.share(' Use this referral code to get Rs. 50 in your FAB2U wallet. ',
        null, null, 'https://www.fab2u.com');
    }


});
