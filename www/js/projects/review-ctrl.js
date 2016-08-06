app.controller('ReviewCtrl', function($scope, $state, $stateParams, $ionicPopup, $ionicLoading, $timeout, $ionicHistory){

  $ionicLoading.show();
  $timeout(function(){
    $ionicLoading.hide();
  }, 1000);

  $scope.projectId = $stateParams.id;
	$scope.projectName = $stateParams.name;
  $scope.landmark = $stateParams.landmark;
	$scope.city = $stateParams.city;
	$scope.showMoreParams = false;

  $scope.identities = [
    {id: 'resident', name: 'Resident', imgsrc:'img/review/resident_grey.png'},
    {id: 'nonResident', name: 'Non Resident', imgsrc:'img/review/nonResident_grey.png'},
  ];

	$scope.residentY = false;
	$scope.nonResidentY = false;
  $scope.comments = ['Bad', 'Average', 'Good', 'Very Good', 'Excellent'];


	$scope.selectIdentity = function(val, index){
		angular.forEach($scope.identities, function(value, key){
			if(val == value.id){
				$scope[val+'Y'] = true;
				$scope.identities[key].imgsrc = 'img/review/'+value.id+'.png';
			} else {
				$scope[value.id+'Y'] = false;
				$scope.identities[key].imgsrc = 'img/review/'+value.id+'_grey.png';
			}
		});
		console.log($scope.residentY, $scope.nonResidentY);
	}

	$scope.project = {};

	$scope.ratingsObject = {
        iconOn: 'ion-record',
        iconOff: 'ion-ios-circle-outline',
        iconOnColor: '#F26551',
        iconOffColor: '#18AFD1',
        rating: 0,
        minRating: 0,
        readOnly:false,
        callback: function(rating) { 
          $scope.ratingsCallback(rating);
        }
      };

    $scope.ratingsCallback = function(rating) {
      $scope.project.rating = rating;
      console.log(rating);
      if(rating <= 2){
        $scope.project.comment = $scope.comments[0];
      } else if(rating > 2 && rating <= 4){
        $scope.project.comment = $scope.comments[1];
      } else if(rating > 4 && rating <= 6){
        $scope.project.comment = $scope.comments[2];
      } else if(rating > 6 && rating <= 8){
        $scope.project.comment = $scope.comments[3];
      } else {
        $scope.project.comment = $scope.comments[4];
      }
      console.log($scope.project);
    };

    $scope.addMore = function(){
    	$scope.showMoreParams = true;
    }


	$scope.tick1 = 'img/review/tick_grey.png';
	$scope.cross1 = 'img/review/cross_grey.png';
	$scope.tick2 = 'img/review/tick_grey.png';
	$scope.cross2 = 'img/review/cross_grey.png';

	$scope.selectConvenient = function(val){
		console.log(val);
		if(val == 1){
			$scope.selectedConvenience = true;
			$scope.tick1='img/review/tick_colored.png';
			$scope.cross1 = 'img/review/cross_grey.png';
		} else if(val == 2){
			$scope.selectedConvenience = false;
			$scope.cross1 = 'img/review/cross_colored.png';
			$scope.tick1 = 'img/review/tick_grey.png';
		}
	}

	$scope.transport = function(val){
		console.log(val);
		if(val == 1){
			$scope.selectedTransport = true;
			$scope.tick2='img/review/tick_colored.png';
			$scope.cross2 = 'img/review/cross_grey.png';
		} else if(val == 2){
			$scope.selectedTransport = false;
			$scope.cross2 = 'img/review/cross_colored.png';
			$scope.tick2 = 'img/review/tick_grey.png';
		}
	}

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

	$scope.kidsY = false;
	$scope.petsY = false;
	$scope.eldersY = false;
	$scope.singlesY = false;
	$scope.familyY = false;

	$scope.recommend = [
		{id: 'kids', name: 'Kids', imgsrc: 'img/review/kids_grey.png'},
		{id: 'pets', name: 'Pets', imgsrc: 'img/review/pets_grey.png'},
		{id: 'elders', name: 'Elders', imgsrc: 'img/review/elders_grey.png'},
		{id: 'singles', name: 'Singles', imgsrc: 'img/review/singles_grey.png'},
		{id: 'family', name: 'Family', imgsrc: 'img/review/family_grey.png'}
	];

	$scope.selectRecommendedFor = function(val ,index){
		console.log(val, index);
		type = val+'Y';
		console.log($scope[type]);
		$scope[type] = !$scope[type];
		console.log($scope[type]);
		if($scope[type]){
			$scope.recommend[index].imgsrc = 'img/review/'+val+'.png';
		}else {
			$scope.recommend[index].imgsrc = 'img/review/'+val+'_grey.png';
		}
	}

	$scope.security = {
		rating: 0,
		comment: ''
	}

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
    $scope.security.rating = rating;
    $scope.security.comment = $scope.comments[rating-1];
    console.log($scope.security);
  };

  $scope.cns = {
    rating: 0,
    comment: ''
  }

  $scope.ratingsObject2 = {
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
    $scope.cns.rating = rating;
    $scope.cns.comment = $scope.comments[rating-1];
    console.log($scope.cns);
  };

  $scope.oga = {
    rating: 0,
    comment: ''
  }
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

  $scope.ratingsCallback3= function(rating) {
    $scope.oga.rating = rating;
    $scope.oga.comment = $scope.comments[rating-1];
    console.log($scope.oga);
  };

  $scope.cqm = {
    rating: 0,
    comment: ''
  }

  $scope.ratingsObject4 = {
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
    $scope.cqm.rating = rating;
    $scope.cqm.comment = $scope.comments[rating-1];
    console.log($scope.cqm);
  };

  $scope.ssc = {
    rating: 0,
    comment: ''
  }
  $scope.ratingsObject5 = {
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
    $scope.ssc.rating = rating;
    $scope.ssc.comment = $scope.comments[rating-1];
    console.log($scope.ssc);
  };

  $scope.review = {
    closeBy: {},
    recommendedFor: {},
    ratings: {}
  };

  var reviewTitlePresent = false;

  $scope.submitReview = function(){

    $ionicLoading.show({
      template: 'Please wait...'
    });

    angular.forEach($scope.identities, function(value, key){
      if($scope[value.id+'Y'] == true){
        $scope.review.customerType = value.id;
      }
    });
    if($scope.project.rating != 0){
      $scope.review.projectRating = $scope.project.rating;
    }
    if($scope.project.review != undefined && $scope.project.review.length != 0){
      $scope.review.projectReview = $scope.project.review;
    }
    if($scope.project.reviewTitle != undefined && $scope.project.reviewTitle.length != 0){
      $scope.review.reviewTitle = $scope.project.reviewTitle;
      reviewTitlePresent = true;
    }
    $scope.review.time = new Date().getTime();
    $scope.review.customerId = window.localStorage.getItem("userUid");
    $scope.review.customerName = window.localStorage.getItem("userName");
    $scope.review.display = false;
    $scope.review.verified = false;

    if($scope.selectedConvenience != undefined){
      $scope.review.convenientlyLocated = $scope.selectedConvenience;
    }
    if($scope.selectedTransport != undefined){
      $scope.review.publicTransportAccessible = $scope.selectedTransport;
    }
    angular.forEach($scope.closeBy, function(value, key){
      if($scope[value.id+'Y'] == true){
        $scope.review.closeBy[value.id] = true;
      }
    });

    angular.forEach($scope.recommend, function(value, key){
      if($scope[value.id+'Y'] == true){
        $scope.review.recommendedFor[value.id] = true;
      }
    });

    if($scope.security.rating != 0){
      $scope.review.ratings.security = $scope.security.rating;
    }
    if($scope.cns.rating != 0){
      $scope.review.ratings.clubhouseSportsActivies = $scope.cns.rating;
    }
    if($scope.oga.rating != 0){
      $scope.review.ratings.openAndGreenArea = $scope.oga.rating;
    }
    if($scope.cqm.rating != 0){
      $scope.review.ratings.consQualAndMaintenance = $scope.cqm.rating;
    }
    if($scope.ssc.rating != 0){
      $scope.review.ratings.shopsAndServicesInCommunity = $scope.ssc.rating;
    }

    if(Object.keys($scope.review.closeBy).length == 0){
      delete $scope.review.closeBy;
    }

    if(Object.keys($scope.review.recommendedFor).length == 0){
      delete $scope.review.recommendedFor;
    }

    if(Object.keys($scope.review.ratings).length == 0){
      delete $scope.review.ratings;
    }

    var exists = false;

    if($scope.review.customerType != undefined && $scope.review.projectRating != undefined && reviewTitlePresent){
      console.log($scope.review);

      db.ref('projectReviews/'+$scope.city+'/residential/'+$scope.projectId).once('value', function(snapshot){
        console.log(snapshot.val());
        angular.forEach(snapshot.val(), function(value, key){
          if(value.customerId == $scope.review.customerId){
            exists = true;
          }
        })
      }).then(function(){
        console.log(exists);
        if(exists){
          //If review already exists then ask for confirmation
          // $ionicLoading.hide();
          // $ionicPopup.confirm({
          //   title:'You have already reviewed this project',
          //   template: 'Submit this review?'
          // }).then(function(res){
          //   if(res){
          //     $ionicLoading.show({
          //       template: 'Please wait...'
          //     });
          //     submitThisReview($scope.review);
          //   } else {
          //     $state.go('app.home');
          //   }
          // })
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Cannot submit review',
            template: 'You have already reviewed this project.'
          }).then(function(){
            $state.go('app.home');
          })
        }else {
          submitThisReview($scope.review);
        }
      });
    } else {
      $ionicLoading.hide();
      console.log($scope.review);
      $ionicPopup.alert({
        title: 'Insufficient Information',
        template: 'Please fill the required information.'
      }). then(function(){
        window.location.reload(true);
      })
    }
  }

  function submitThisReview(review){
    console.log('called');
    var newReviewKey = db.ref('projectReviews/'+$scope.city+'/residential/'+$scope.projectId).push().key;
    console.log(newReviewKey);
    var newReview = {};
    newReview['projectReviews/'+$scope.city+'/residential/'+$scope.projectId+'/'+newReviewKey] = review;
    console.log(newReview);
    db.ref().update(newReview).then(function(){
        $scope.reviewRecord = {
          projectId: $scope.projectId,
          cityId: $scope.city,
          userType: $scope.review.customerType
        };
        var updateReviewRecord = {};
        console.log('users/data/'+review.customerId+'/reviews/'+newReviewKey);
        updateReviewRecord['users/data/'+review.customerId+'/reviews/'+newReviewKey] = $scope.reviewRecord;
        console.log(updateReviewRecord);
        db.ref().update(updateReviewRecord).then(function(){
          $ionicLoading.hide();
          $ionicPopup.alert({
            title:'Your review was successfully submitted.'
          }).then(function(){
            $state.go('app.home');
          })
        });
    })
  }
  $scope.goBack = function(){
      $ionicLoading.show();
      $timeout(function(){
        $ionicLoading.hide();
      }, 1000);
      $timeout(function(){
          $ionicHistory.goBack();
      }, 500);
    
  }

});