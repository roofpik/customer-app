app
.controller('tabCtrl', function($stateParams, $state, $rootScope, $scope, projectData, projectReview, $ionicLoading, $ionicHistory) {
    
})

.controller('overviewCtrl', function(PricingFilterService, $ionicModal, $ionicSlideBoxDelegate, $stateParams, $state, $rootScope, $scope, projectData, projectReview, $ionicLoading, $ionicHistory) {
    if($rootScope.project === {} || $rootScope.project === null || $rootScope.project === undefined) {
        $ionicHistory.goBack();
        //$state.go('project-search');
        return;
    }
    $ionicLoading.hide().then(function(){
        console.log('hidden3');
    });
    // Overview Values
    $rootScope.accomodations = {};
    $rootScope.size = {
        min: false,
        max: false
    };
    angular.forEach($rootScope.project.units.configurations, function(obj) {
        if(obj.type) {
            $rootScope.accomodations[obj.type] = true;
        }
        if(obj.superArea != undefined) {

            if($rootScope.size.min === false) {
                $rootScope.size.min = obj.superArea;
            }
            else {
                $rootScope.size.min = $rootScope.size.min > obj.superArea ? obj.superArea : $rootScope.size.min;
            }
            if($rootScope.size.max === false) {
                $rootScope.size.max = obj.superArea;
            }
            else {
                $rootScope.size.max = $rootScope.size.max < obj.superArea ? obj.superArea : $rootScope.size.max;
            }
        }
    });
    $rootScope.goBackToSearch = function() {
        $ionicHistory.goBack();
        //$state.go('project-search');
        $rootScope.project = {};
        $rootScope.projectReview = {};
        $rootScope.percentageReview = {};
        $scope.pricing = {
            filter: {
                pType: undefined,
                pBHK: undefined,
                pSize: undefined,
                buy: true
            },
            propertyType: null,
            propertyBHK: null,
            propertySize: null,
            propertyBHKArray: [],
            propertySizeArray: [],
            projectFiltered: {
                aggregator: null,
                configuration: null
            }
        };
    }
    $scope.projectType = [
        {type: 'apartment', status: false},
        {type: 'studio', status: false},
        {type: 'rowHouse', status: false},
        {type: 'servicedApartment', status: false},
        {type: 'villa', status: false}
    ];
    angular.forEach($scope.projectType, function(obj) {
        if($rootScope.project.projectDetails.projectType[obj.type]) {
            obj.status = true;
        }
    });
    var rating = (Math.round($rootScope.percentageReview.projectRating * 2) / 4).toFixed(1);
    $scope.rating = {
        rate: rating,
        max: 5,
        readOnly: true
    };
    function isKeyStats() {
        if($rootScope.project.keyStats.lifeStyle === 0
        && $rootScope.project.keyStats.luxury === 0
        && $rootScope.project.keyStats.amenities === 0
        && $rootScope.project.keyStats.security === 0 )
        $rootScope.isKeyStats = false;
        else $rootScope.isKeyStats = true;
    }
    $scope.$watch('$rootScope.project.keyStats', function(newValue, oldValue) {
        isKeyStats();
    });
    $ionicModal.fromTemplateUrl('image.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    $scope.images = [
        {url:$rootScope.project.images.main.url}
    ];
    angular.forEach($rootScope.project.images, function(value, key) {
        if(key != 'main') {
            angular.forEach(value, function(value, key) {
                $scope.images.push(value);
            });
        }
    });
    $scope.startGallery = function() {
        $ionicSlideBoxDelegate
        .$getByHandle('gallery')
        .enableSlide(true);
        $scope.modal.show();
    }


    // Pricing

    // $scope.pricing = {
    //     filter: {
    //         pType: undefined,
    //         pBHK: null,
    //         pSize: undefined,
    //         buy: true
    //     },
    //     propertyType: null,
    //     propertyBHK: null,
    //     propertySize: null,
    //     propertyBHKArray: [],
    //     propertySizeArray: [],
    //     projectFiltered: {
    //         aggregator: null,
    //         configuration: null
    //     }
    // };

    $rootScope.setPropertyType = function(value) {
        $scope.pricing.propertySizeArray = [];
        $scope.pricing.filter.pType =  value;
        $scope.pricing.propertyType = value;
        setBHK(value);
        $scope.pricing.projectFiltered = {
            aggregator: undefined,
            configuration: undefined
        };
        console.log($scope.pricing.projectFiltered);
        $scope.pricing.propertyBHK = null;
        $scope.pricing.propertySize = null;
    };

    function setBHK(propertyType) {
        $scope.pricing.propertyBHKArray = [];
        var uniqueArray = [];
        console.log($rootScope.propertySizes);
        angular.forEach($rootScope.propertySizes, function(obj) {
            if(obj.propertyType === propertyType) {
                uniqueArray.push(obj.type);
            }
        });
        $scope.pricing.propertyBHKArray = uniqueArray.sort().filter(function(elem, pos) {
            return uniqueArray.indexOf(elem) == pos;
        });
        console.log($scope.pricing.propertyBHKArray);
    }

    $rootScope.setPropertyBHK = function(value) {
        $scope.pricing.filter.pBHK = value;
        $scope.pricing.propertyBHK = value;
        $rootScope.pBHKW = value+'BHK';
        setSize(value);
        $scope.ifSize = true;
        $scope.pricing.projectFiltered = {
            aggregator: undefined,
            configuration: undefined
        };
        $scope.pricing.propertySize = null;
    };

    function setSize(propertyBHK) {
        $scope.pricing.propertySizeArray = [];
        angular.forEach($rootScope.propertySizes, function(obj) {
            if(obj.type === propertyBHK) {
                $scope.pricing.propertySizeArray.push(obj);
            }
        });
        console.log($scope.pricing.propertySizeArray);
    }

    $rootScope.setPropertySize = function(value) {
        $scope.pricing.filter.pSize = value;
        $scope.pricing.propertySize = value;
        if($scope.pricing.filter.buy === true 
           || $scope.pricing.filter.buy === false
           || $scope.pricing.filter.pType
           || $scope.pricing.filter.pSize
           || $scope.pricing.filter.pBHK)
        {
            console.log($scope.pricing.filter);
            filterProject($scope.pricing.filter);
        }
    };

    PricingFilterService.getSizes($rootScope.project.projectId).then(function(response) {
        if(response != null || response != undefined) {
            $rootScope.propertySizes = response;
            console.log(response);
        }
        else {
            $rootScope.propertySizes = null;
        }
        
    });

    
    function filterProject(filter) {
        $ionicLoading.show({
            template: 'Loading...'
        }).then(function() {
            PricingFilterService.filterProject(filter).then(function(response) {
                if(response != undefined || response != null) {
                    if(Object.getOwnPropertyNames(response).length === 0) {
                        $scope.pricing.projectFiltered.configuration = null;
                    }
                    else {
                        $scope.pricing.projectFiltered.configuration = response;
                    }
                }
                else {
                    $scope.pricing.projectFiltered.configuration = null;
                }
                console.log($scope.pricing.projectFiltered);
                PricingFilterService.filterProjectFromAggregator(filter).then(function(response) {
                    if(response != undefined || response != null) {
                        if(Object.getOwnPropertyNames(response).length === 0) {
                            $scope.pricing.projectFiltered.aggregator = null;
                        }
                        else {
                            $scope.pricing.projectFiltered.aggregator = response;
                        }
                    }
                    else {
                        $scope.pricing.projectFiltered.aggregator = null;
                    }
                    console.log($scope.pricing.projectFiltered);
                });
            });
            $ionicLoading.hide();
        });
    };

})

.controller('reviewsCtrl', function($state, $scope, $rootScope, $ionicHistory) {
    if($rootScope.project === {} || $rootScope.project === null || $rootScope.project === undefined) {
        $ionicHistory.goBack();
        //$state.go('project-search');
        return;
    }
    console.log($rootScope.project);
    function isParameters() {
        console.log('execute');
        if($rootScope.percentageReview.parameters.security === 0
        && $rootScope.percentageReview.parameters.openAndGreenArea === 0
        && $rootScope.percentageReview.parameters.consQualAndMaintenance === 0
        && $rootScope.percentageReview.parameters.shopsAndServicesInCommunity === 0
        && $rootScope.percentageReview.parameters.clubhouseSportsActivities === 0 )
        $rootScope.isParameters = false;
        else $rootScope.isParameters = true;
    };
    function isCloseBy() {
        if($rootScope.percentageReview.closeBy.market === 0
        && $rootScope.percentageReview.closeBy.school === 0
        && $rootScope.percentageReview.closeBy.hospital === 0 )
        $rootScope.isCloseBy = false;
        else $rootScope.isCloseBy = true;
    };
    function isRecommendedFor() {
        if($rootScope.percentageReview.recommendedFor.kids === 0
        && $rootScope.percentageReview.recommendedFor.pets === 0
        && $rootScope.percentageReview.recommendedFor.elders === 0
        && $rootScope.percentageReview.recommendedFor.singles === 0 )
        $rootScope.isRecommendedFor = false;
        else $rootScope.isRecommendedFor = true;
    }

    $scope.$watch('$rootScope.percentageReview.parameters', function(newValue, oldValue) {
        isParameters();  
        isCloseBy();
        isRecommendedFor();
    });
    $scope.temp = [];
    $scope.show = [];

    $scope.toggleShow = function(index) {
        if($scope.show[index] != 'visible') {
            $scope.show[index] = 'visible';
        }
        else {
            $scope.show[index] = '';
        }
    }
    $scope.showButton = function(value) {
        console.log(value);
        // var element = $('#projectReview-'+value);
        // var clone = element
        //             .clone()
        //             .css({display: 'inline', width: 'auto', visibility: 'hidden'})
        //             .appendTo('body');
        // console.log(element);
        // console.log(clone);
        // if(clone.width() > element.width) {
        //     console.log('#projectReview-'+value);
        // }
    }
})

.controller('pricingCtrl', function($state, $scope, $rootScope, PricingFilterService, $ionicLoading, $ionicHistory) {
    if($rootScope.project === {} || $rootScope.project === null || $rootScope.project === undefined) {
        $ionicHistory.goBack();
      //  $state.go('project-search');
        return;
    }
    function isPricing() {
        if($rootScope.project.costing) {
            if($rootScope.project.costing.powerBackupChargesFixed
            && $rootScope.project.costing.maintenanceChargesFixed
            && $rootScope.project.costing.moveInCharges
            && $rootScope.project.costing.moveOutCharges
            && $rootScope.project.costing.cookingChargeOneMeal
            && $rootScope.project.costing.cookingChargeTwoMeals
            && $rootScope.project.costing.maid12Hours
            && $rootScope.project.costing.maid24Hours )
            $rootScope.isPricing = true;
            else $rootScope.isPricing = false;
        }
        else {
            $rootScope.isPricing = false;
        }
    }

    $scope.$watch('$rootScope.project.costing', function(newValue, oldValue) {
        isPricing();
    });

    $scope.toggleBuy = function() {
        $scope.pricing.filter.buy = !$scope.pricing.filter.buy;
    }
})

.controller('amenitiesCtrl', function($state, $scope, $rootScope, $ionicHistory) {
    if($rootScope.project === {} || $rootScope.project === null || $rootScope.project === undefined) {
        $ionicHistory.goBack();
      //  $state.go('project-search');
        return;
    }
    $scope.clubHouse = {
        left: {},
        right: {}
    };
    var i = 1;
    angular.forEach($rootScope.project.clubHouse, function(key, value) {
        if(i <= Object.getOwnPropertyNames($rootScope.project.clubHouse).length / 2) {
            $scope.clubHouse.left[value] = key;
        }
        else {
            $scope.clubHouse.right[value] = key;
        }
        i++;
    });
    console.log($scope.clubHouse);

    $scope.specifications = {
        left: {},
        right: {}
    };
    i = 1;
    angular.forEach($rootScope.project.units.specifications, function(key, value) {
        if(i <= Object.getOwnPropertyNames($rootScope.project.units.specifications).length / 2) {
            $scope.specifications.left[value] = key;
        }
        else {
            $scope.specifications.right[value] = key;
        }
        i++;
    });
    console.log($scope.specifications);
})

.controller('nearmeCtrl', function($state, $rootScope, $scope, $ionicPopup, $ionicModal, $ionicHistory) {
    if($rootScope.project === {} || $rootScope.project === null || $rootScope.project === undefined) {
        $ionicHistory.goBack();
       // $state.go('project-search');
        return;
    }
    $scope.nearme = $rootScope.project.nearMe;
    $scope.societyShop = $rootScope.project.societyShops;
    $ionicModal.fromTemplateUrl('modal.html',{
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
        console.log(modal);
    });
    $scope.closeModal = function() {
        $scope.modal.hide();
    }
    $scope.nearMe = function(obj) {
        $scope.categoryInfo = $rootScope.project.nearMe[obj].contacts;
        console.log($scope.categoryInfo);
        if($rootScope.project.nearMe[obj].contacts) {
            $scope.modal.show();
        }
        else {
            $ionicPopup.alert({
                subTitle: 'Contact Details',
                template: 'Sorry No Contact Details Found'
            })
            .then(function(res) {
                if(res) {
                    console.log('You are sure');
                } 
                else {
                    console.log('You are not sure');
                }
            });
        }
    }
    $scope.societyShops = function(obj) {
        $scope.categoryInfo = $rootScope.project.societyShops[obj].contacts;
        if($rootScope.project.societyShops[obj].contacts) {
            $scope.modal.show();
        }
        else {
            $ionicPopup.alert({
                subTitle: 'Contact Details',
                template: 'Sorry No Contact Details Found'
            })
            .then(function(res) {
                if(res) {
                    console.log('You are sure');
                } 
                else {
                    console.log('You are not sure');
                }
            });
        }
    }
})
;

app
.filter('filterSize', function() {
    return function(input, search) {
        console.log(input);
        if (!input) return input;
        if (!search) return input;
        var expected = search;
        var result = [];
        angular.forEach(input, function(value, key) {
            var actual = value.type;
            if (search === value.type) {
                console.log(value.superArea);
                result.push(value.superArea);
            }
        });
        return result;
    }
})
.filter('inrCurrencyFilter', function() {
    return function(val) {
        if(val >= 10000000) val = (val/10000000).toFixed(2) + ' Cr';
        else if(val >= 100000) val = (val/100000).toFixed(2) + ' Lac';
        // else if(val >= 1000) val = (val/1000).toFixed(2) + ' K';
        return val;
    }
})
;
