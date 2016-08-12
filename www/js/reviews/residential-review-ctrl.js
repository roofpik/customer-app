app.controller('residentialReviewCtrl', function($scope){

	$scope.project = {};

	$scope.identities = [
		{id: 'resident', name: 'Resident', imgsrc:'img/review/resident_grey.png'},
		{id: 'nonResident', name: 'Non Resident', imgsrc:'img/review/nonResident_grey.png'},
	];

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
		$scope.project.rating = rating;
	};

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
		$scope.project.rating = rating;
	};

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
		$scope.project.rating = rating;
	};

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
		$scope.project.rating = rating;
	};

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
		$scope.project.rating = rating;
	};


});