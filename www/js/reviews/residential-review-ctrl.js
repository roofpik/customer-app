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

});