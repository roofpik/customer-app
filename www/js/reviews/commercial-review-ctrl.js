app.controller('commercialReviewCtrl', function($scope, $ionicPopup){
	$scope.review = {};

	$scope.comment = ['Poor', 'Average', 'Good', 'Very Good', 'Excellent'];

	$scope.ratingsObject1= {
		iconOn: 'ion-record',
		iconOff: 'ion-ios-circle-outline',
		iconOnColor: '#F26551',
		iconOffColor: '#18AFD1',
		rating: 0,
		minRating: 0,
		readOnly:false,
		callback: function(rating) { 
		 	$scope.ratingsCallback1(rating);
		}
	};

	$scope.ratingsCallback1 = function(rating) {
		$scope.review.rating = rating;
		$scope.mainComment = $scope.comment[rating-1];
		console.log($scope.mainComment);
	};

	$scope.parkingAvailability = {};

	$scope.ratingsObject2= {
		iconOn: 'ion-record',
		iconOff: 'ion-ios-circle-outline',
		iconOnColor: '#F26551',
		iconOffColor: '#18AFD1',
		rating: 0,
		minRating: 0,
		readOnly:false,
		callback: function(rating) { 
		 	$scope.ratingsCallback2(rating);
		}
	};

	$scope.ratingsCallback2 = function(rating) {
		$scope.parkingAvailability.rating = rating;
		$scope.parkingAvailability.comment = $scope.comment[rating-1];
	};

	$scope.cleanliness = {};

	$scope.ratingsObject3= {
		iconOn: 'ion-record',
		iconOff: 'ion-ios-circle-outline',
		iconOnColor: '#F26551',
		iconOffColor: '#18AFD1',
		rating: 0,
		minRating: 0,
		readOnly:false,
		callback: function(rating) { 
		 	$scope.ratingsCallback3(rating);
		}
	};

	$scope.ratingsCallback3 = function(rating) {
		$scope.cleanliness.rating = rating;
		$scope.cleanliness.comment = $scope.comment[rating-1];
	};

	$scope.liftWaitingTime = {};

	$scope.ratingsObject4= {
		iconOn: 'ion-record',
		iconOff: 'ion-ios-circle-outline',
		iconOnColor: '#F26551',
		iconOffColor: '#18AFD1',
		rating: 0,
		minRating: 0,
		readOnly:false,
		callback: function(rating) { 
		 	$scope.ratingsCallback4(rating);
		}
	};

	$scope.ratingsCallback4 = function(rating) {
		$scope.liftWaitingTime.rating = rating;
		$scope.liftWaitingTime.comment = $scope.comment[rating-1];
	};

	$scope.security = {};

	$scope.ratingsObject5= {
		iconOn: 'ion-record',
		iconOff: 'ion-ios-circle-outline',
		iconOnColor: '#F26551',
		iconOffColor: '#18AFD1',
		rating: 0,
		minRating: 0,
		readOnly:false,
		callback: function(rating) { 
		 	$scope.ratingsCallback5(rating);
		}
	};

	$scope.ratingsCallback5 = function(rating) {
		$scope.security.rating = rating;
		$scope.security.comment = $scope.comment[rating-1];
	};

	$scope.getConvenient = function(value){
		$scope.review.convenientlyLocated = value;
		console.log($scope.review.convenientlyLocated);
	}

	$scope.publicTransport = function(value){
		$scope.review.easyAccessToPublicTransport = value;
		console.log($scope.review.easyAccessToPublicTransport);
	}

	$scope.nearby = function(value){
		$scope.review.restaurantCafeNearby = value;
		console.log($scope.review.restaurantCafeNearby);
	}

	$scope.submitReview = function(){		

	    $scope.review.time = new Date().getTime();
	    // $scope.review.customerId = window.localStorage.getItem("userUid");
	    // $scope.review.customerName = window.localStorage.getItem("userName");
	    $scope.review.display = false;
	    $scope.review.verified = false;
	    if($scope.review.ratings == undefined){
	    	$scope.review.ratings = {};
	    }
	    if($scope.parkingAvailability.rating != 0 && $scope.parkingAvailability.rating != undefined){
	      $scope.review.ratings.parkingAvailability = $scope.parkingAvailability.rating;
	    }
	    if($scope.cleanliness.rating != 0 && $scope.cleanliness.rating != undefined){
	      $scope.review.ratings.cleanliness = $scope.cleanliness.rating;
	    }
	    if($scope.liftWaitingTime.rating != 0 && $scope.liftWaitingTime.rating != undefined){
	      $scope.review.ratings.liftWaitingTime = $scope.liftWaitingTime.rating;
	    }
	    if($scope.security.rating != 0 && $scope.security.rating != undefined){
	      $scope.review.ratings.security = $scope.security.rating;
	    }

	    console.log($scope.review.ratings);
	    console.log(Object.keys($scope.review.ratings).length);
	    if(Object.keys($scope.review.ratings).length == 0){
	      delete $scope.review.ratings;
	    }
	    console.log($scope.review);
	    if(($scope.review.rating==0)  || $scope.review.reviewTitle==undefined || $scope.review.reviewTitle.length ==0){
	    	$ionicPopup.alert({
	    		title:'Missing Information',
	    		template:'Cannot Submit Review'
	    	})
	    }
	}
})