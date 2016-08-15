app.controller('localityReviewCtrl', function($scope, $ionicPopup){

	$scope.review = {};

	$scope.hospitalY = false;
	$scope.marketY = false;
	$scope.schoolY = false;

	$scope.closeBy = [
		{id: 'school', name: 'Good Schools', imgsrc: 'img/review/school_grey.png'},
		{id: 'market', name: 'Market', imgsrc: 'img/review/market_grey.png'},
		{id: 'hospital', name: 'Good Hospitals', imgsrc: 'img/review/hospital_grey.png'}
	];

	$scope.selectCloseby = function(val, index){
		console.log(val, index);
		type = val+'Y';
		console.log($scope[type]);
		$scope[type] = !$scope[type];
		if($scope[type]){
			$scope.closeBy[index].imgsrc = 'img/review/'+val+'.png';
		}else {
			$scope.closeBy[index].imgsrc = 'img/review/'+val+'_grey.png';
		}
	}

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

	$scope.security = {};

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
		$scope.security.rating = rating;
		$scope.security.comment = $scope.comment[rating-1];
	};

	$scope.infrastructure = {};

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
		$scope.infrastructure.rating = rating;
		$scope.infrastructure.comment = $scope.comment[rating-1];
	};

	$scope.parksOpenandGreenAreas = {};

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
		$scope.parksOpenandGreenAreas.rating = rating;
		$scope.parksOpenandGreenAreas.comment = $scope.comment[rating-1];
	};

	$scope.electricityandWaterSupply = {};

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
		$scope.electricityandWaterSupply.rating = rating;
		$scope.electricityandWaterSupply.comment = $scope.comment[rating-1];
	};


	$scope.submitReview = function(){
	    $scope.review.time = new Date().getTime();
	    // $scope.review.customerId = window.localStorage.getItem("userUid");
	    // $scope.review.customerName = window.localStorage.getItem("userName");
	    $scope.review.display = false;
	    $scope.review.verified = false;
	    if($scope.review.ratings == undefined){
	    	$scope.review.ratings = {};
	    }
	    if($scope.security.rating != 0 && $scope.security.rating != undefined){
	      $scope.review.ratings.security = $scope.security.rating;
	    }
	    if($scope.infrastructure.rating != 0 && $scope.infrastructure.rating != undefined){
	      $scope.review.ratings.infrastructure = $scope.infrastructure.rating;
	    }
	    if($scope.parksOpenandGreenAreas.rating != 0 && $scope.parksOpenandGreenAreas.rating != undefined){
	      $scope.review.ratings.parksOpenandGreenAreas = $scope.parksOpenandGreenAreas.rating;
	    }
	    if($scope.electricityandWaterSupply.rating != 0 && $scope.electricityandWaterSupply.rating != undefined){
	      $scope.review.ratings.electricityandWaterSupply = $scope.electricityandWaterSupply.rating;
	    }

	    if($scope.review.closeBy == undefined){
	    	$scope.review.closeBy = {};
	    }
	    angular.forEach($scope.closeBy, function(value, key){
	      if($scope[value.id+'Y'] == true){
	        $scope.review.closeBy[value.id] = true;
	      }
	    });
	    if(Object.keys($scope.review.closeBy).length == 0){
	      delete $scope.review.closeBy;
	    }
	    console.log($scope.review.ratings);
	    console.log(Object.keys($scope.review.ratings).length);
	    if(Object.keys($scope.review.ratings).length == 0){
	      delete $scope.review.ratings;
	    }
	    console.log($scope.review);
	    if(($scope.review.rating==0)  || $scope.review.reviewTitle==undefined || $scope.review.reviewTitle.length ==0){
	    	$ionicPopup.alert({
	    		template:'Cannot Submit Review'
	    	})
	    }
	}

});