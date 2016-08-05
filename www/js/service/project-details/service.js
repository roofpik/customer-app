app
.service('ProjectDetailsService', function($state, $q, $rootScope) {
   var Obj = {};
   var cityID = '-KN7HFa3un2SPyrUKosy';
   // var projectID = '-KNEfpTlt843gCbuA__Q';
   function calculateKeyStats(project) {

      project['keyStats'] = {
         lifeStyle: 0,
         security: 0,
         luxury: 0,
         amenities: 0
      };
      // Main Gate
      if(project.security.mainGate.boomBarriers) {
         project['keyStats'].security += 2;
      }
      if(project.security.mainGate.guards) {
         project['keyStats'].security += 10;
      }
      if(project.security.mainGate.intercom) {
         project['keyStats'].security += 5;
      }
      if(project.security.mainGate.cctv) {
         project['keyStats'].security += 5;
      }
      // Tower
      if(project.security.tower.accessControlled) {
         project['keyStats'].security += 5;
      }
      if(project.security.tower.guards) {
         project['keyStats'].security += 5;
      }
      if(project.security.tower.cctv) {
         project['keyStats'].security += 2;
      }
      // Others
      if(project.security.stickersForVehicles) {
         project['keyStats'].security += 2;
      }
      if(project.security.tagsForVehicles) {
         project['keyStats'].security += 1;
      }
      if(project.security.videoDoorPhone) {
         project['keyStats'].security += 1;
      }
      if(project.security.workerClearance) {
         project['keyStats'].security += 1;
      }
      if(project.security.workerPass) {
         project['keyStats'].security += 1;
      }

      // End Security

      // LifeStyle

         // In Specification

      if(project.units.specifications) {
         if(project.units.specifications.homeAutomation) {
            project['keyStats'].lifeStyle += 3;
            project['keyStats'].luxury += 5;
         }
         if(project.units.specifications.airConditioning) {
            project['keyStats'].lifeStyle += 3;
            project['keyStats'].luxury += 5;
         }
         if(project.units.specifications.kitchenModular) {
            project['keyStats'].luxury += 2;
         }
         if(project.units.specifications.kitchenAppliances) {
            project['keyStats'].luxury += 2;
         }
         if(project.units.specifications.kitchenHob) {
            project['keyStats'].luxury += 1;
         }
         if(project.units.specifications.kitchenChimney) {
            project['keyStats'].luxury += 1;
         }
         if(project.units.specifications.kitchenDishwasher) {
            project['keyStats'].luxury += 2;
         }
         if(project.units.specifications.kitchenMicrowaveOven) {
            project['keyStats'].luxury += 2;
         }
         if(project.units.specifications.kitchenRefrigerator) {
            project['keyStats'].luxury += 2;
         }
         if(project.units.specifications.kitchenOTG) {
            project['keyStats'].luxury += 2;
         }
         if(project.units.specifications.kitchenRefrigerator) {
            project['keyStats'].luxury += 2;
         }
         if(project.units.specifications.wardrobes) {
            project['keyStats'].luxury += 2;
         }

            // Flooring

         if(project.units.specifications.flooringLivingDining) {
            var type = project.units.specifications.flooringLivingDining;
            if(type === 'Imported Marble') { project['keyStats'].luxury += 7; }
            if(type === 'Vitrified Tiles') {}
            if(type === 'Laminated Wooden Flooring') {}
            if(type === 'Hardwood Flooring') { project['keyStats'].luxury += 8; }
            if(type === 'Marble Flooring') {}
            if(type === 'Natural Stone') { project['keyStats'].luxury += 7; }
            if(type === 'Other') {}
         }

         if(project.units.specifications.flooringMasterBedroom) {
            var type = project.units.specifications.flooringMasterBedroom;
            if(type === 'Italian Marble') { project['keyStats'].luxury += 10; }
            if(type === 'Imported Marble') { project['keyStats'].luxury += 7; }
            if(type === 'Vitrified Tiles') {}
            if(type === 'Laminated Wooden Flooring') {}
            if(type === 'Hardwood Flooring') { project['keyStats'].luxury += 8; }
            if(type === 'Marble Flooring') {}
            if(type === 'Natural Stone') { project['keyStats'].luxury += 7; }
            if(type === 'Other') {}
         }

         if(project.units.specifications.flooringOtherBedrooms) {
            var type = project.units.specifications.flooringOtherBedrooms;
            if(type === 'Italian Marble') { project['keyStats'].luxury += 3; }
            if(type === 'Imported Marble') { project['keyStats'].luxury += 2; }
            if(type === 'Vitrified Tiles') {}
            if(type === 'Laminated Wooden Flooring') {}
            if(type === 'Hardwood Flooring') { project['keyStats'].luxury += 2; }
            if(type === 'Marble Flooring') {}
            if(type === 'Natural Stone') { project['keyStats'].luxury += 2; }
            if(type === 'Other') {}
         }

            // Flooring End

         if(project.units.specifications.showerCubicle) {
            var type = project.units.specifications.showerCubicle;
            if(type === 'All Rooms') { project['keyStats'].luxury += 2; }
            if(type === 'Master Only') { project['keyStats'].luxury += 1; }
         }

         if(project.units.specifications.bathTub) {
            var type = project.units.specifications.bathTub;
            if(type === 'All Rooms') { project['keyStats'].luxury += 2; }
            if(type === 'Master Only') { project['keyStats'].luxury += 1; }
         }

         if(project.units.specifications.showerCubicle) {
            var type = project.units.specifications.flooringOtherBedrooms;
            if(type === 'All Rooms') { project['keyStats'].luxury += 3; }
            if(type === 'Master Only') { project['keyStats'].luxury += 2; }
         } 
      }

         // park

      if(project.other.park) {
         var type = project.other.park;
         if(type === 'Small') { 
            project['keyStats'].lifeStyle += 6;
            project['keyStats'].amenities += 6; 
         }
         if(type === 'Medium') { 
            project['keyStats'].lifeStyle += 8;
            project['keyStats'].amenities += 8; 
         }
         if(type === 'Large') { 
            project['keyStats'].lifeStyle += 10;
            project['keyStats'].amenities += 10; 
         }
      }
         // Park End

         // Sport Activities

      if(project.sportsActivities.football) {
         project['keyStats'].lifeStyle += 2;
         project['keyStats'].luxury += 1;
         project['keyStats'].amenities += 2;          
      }
      if(project.sportsActivities.cricket) {
         project['keyStats'].lifeStyle += 2;
         project['keyStats'].luxury += 1;
         project['keyStats'].amenities += 2;          
      }
      if(project.sportsActivities.tennis) {
         project['keyStats'].lifeStyle += 5;
         project['keyStats'].amenities += 5;          
      }
      if(project.sportsActivities.basketball) {
         project['keyStats'].lifeStyle += 5;
         project['keyStats'].amenities += 5;          
      }
      if(project.sportsActivities.multiPurposeCourt) {
         project['keyStats'].amenities += 2;          
      }
      if(project.sportsActivities.chipAndPutt) {
         project['keyStats'].lifeStyle += 1;
         project['keyStats'].luxury += 1;         
      }
      if(project.sportsActivities.skatingRink) {
         project['keyStats'].lifeStyle += 2;
         project['keyStats'].amenities += 2;          
      }
      if(project.sportsActivities.volleyball) {
         project['keyStats'].lifeStyle += 1;
         project['keyStats'].amenities += 1;          
      }
      if(project.sportsActivities.amphitheatre) {
         project['keyStats'].lifeStyle += 3;
         project['keyStats'].amenities += 3;          
      }
      if(project.sportsActivities.badminton) {
         project['keyStats'].lifeStyle += 5;
         project['keyStats'].amenities += 5;          
      }
      if(project.sportsActivities.tableTennis) {
         project['keyStats'].lifeStyle += 5;
         project['keyStats'].amenities += 5;          
      }
      if(project.sportsActivities.squash) {
         project['keyStats'].lifeStyle += 3;
         project['keyStats'].luxury += 1;
         project['keyStats'].amenities += 3;          
      }
      if(project.sportsActivities.swimmingPool) {
         project['keyStats'].lifeStyle += 10;
         project['keyStats'].luxury += 1;
         project['keyStats'].amenities += 10;          
      }
      if(project.sportsActivities.kidsSwimmingPool) {
         project['keyStats'].lifeStyle += 5;
         project['keyStats'].amenities += 5;          
      }
      if(project.sportsActivities.kidsPlayArea) {
         project['keyStats'].lifeStyle += 5;
         project['keyStats'].amenities += 5;          
      }
      if(project.sportsActivities.poolTable) {
         project['keyStats'].lifeStyle += 2;
         project['keyStats'].amenities += 2;          
      }
      if(project.sportsActivities.snookerTable) {
         project['keyStats'].lifeStyle += 2;
         project['keyStats'].amenities += 2;          
      }
      if(project.sportsActivities.bowlingAlley) {
         project['keyStats'].lifeStyle += 2;
         project['keyStats'].luxury += 1;
         project['keyStats'].amenities += 2;          
      }
      if(project.sportsActivities.joggingTrack) {
         project['keyStats'].lifeStyle += 3;
         project['keyStats'].amenities += 3;          
      }
      
         // ClubHouse

      if(project.clubHouse.restaurant) {
         project['keyStats'].lifeStyle += 2;
         project['keyStats'].amenities += 2;          
      }
      if(project.clubHouse.yogaRoom) {
         project['keyStats'].lifeStyle += 2;
         project['keyStats'].amenities += 2;          
      }
      if(project.clubHouse.aerobicsRooms) {
         project['keyStats'].lifeStyle += 2;
         project['keyStats'].amenities += 2;          
      }
      if(project.clubHouse.danceRoom) {
         project['keyStats'].lifeStyle += 1;
         project['keyStats'].amenities += 1;          
      }
      if(project.clubHouse.musicRoom) {
         project['keyStats'].lifeStyle += 1;
         project['keyStats'].amenities += 1;          
      }
      if(project.clubHouse.salon) {
         project['keyStats'].lifeStyle += 2;
         project['keyStats'].luxury += 1;
         project['keyStats'].amenities += 2;          
      }
      if(project.clubHouse.spa) {
         project['keyStats'].lifeStyle += 1;
         project['keyStats'].luxury += 1;          
      }
      if(project.clubHouse.gym) {
         project['keyStats'].lifeStyle += 8;
         project['keyStats'].amenities += 8;          
      }
      if(project.clubHouse.miniTheatre) {
         project['keyStats'].lifeStyle += 2;
         project['keyStats'].luxury += 1;       
      }
      if(project.clubHouse.bar) {
         project['keyStats'].lifeStyle += 2;
         project['keyStats'].luxury += 1;         
      }
      if(project.clubHouse.cafe) {
         project['keyStats'].lifeStyle += 2;
         project['keyStats'].luxury += 1;         
      }
      if(project.clubHouse.businessCentre) {
         project['keyStats'].luxury += 1;          
      }
      if(project.clubHouse.steamRoom) {
         project['keyStats'].luxury += 1;         
      }
      if(project.clubHouse.saunaRoom) {
         project['keyStats'].luxury += 1;          
      }
      if(project.clubHouse.jacuzzi) {
         project['keyStats'].luxury += 1;          
      }

         // Other

      if(project.other.powerBackup) {
         var type = project.other.powerBackup;
         if(type === 'Full') {
            project['keyStats'].amenities += 10;  
         }
         if(type === 'Partial') {
            project['keyStats'].amenities += 5;  
         }
      }

      if(project.other.waitingLoungeInTower) {
         project['keyStats'].lifeStyle += 3;        
      }

      if(project.other.airConditioningInWaitingLounge) {
         project['keyStats'].lifeStyle += 2;        
      }

      if(project.other.petFriendly) {
         project['keyStats'].amenities += 2;        
      }

      angular.forEach(project.units.configurations, function(obj) {
         if(obj['studyRoom']) {
            project['keyStats'].lifeStyle += 3;
            project['keyStats'].luxury += 2;
         }
         if(obj['servantUtilityRoom']) {
            project['keyStats'].lifeStyle += 3;
            project['keyStats'].luxury += 2;
         }
         if(obj['familyLounge']) {
            project['keyStats'].lifeStyle += 3;
            project['keyStats'].luxury += 2;
         }
         
      });

      project['keyStats'].security = Math.ceil(project['keyStats'].security/40*100);
      project['keyStats'].lifeStyle = Math.ceil(project['keyStats'].lifeStyle/137*100);
      project['keyStats'].luxury = Math.ceil(project['keyStats'].luxury/134*100);
      project['keyStats'].amenities = Math.ceil(project['keyStats'].amenities/128*100);

      return project;

   }
   Obj = {
      getProjectDetail: function(projectID) {
         console.log(projectID);
         if(!projectID) {
            $state.go('project-search');
            return;
         }
         var defer = $q.defer();
         var result = {};
         $rootScope.projectID = projectID;
         result = JSON.parse(window.localStorage['allProjectsData'] || {});
         console.log(result);
         calculateKeyStats(result[projectID]);
         console.log(result[projectID]);
         if(result[projectID]) {
            $rootScope.project = result[projectID];
         }
         else {
            $rootScope.project = null;
         }
         defer.resolve(result[projectID]);
         return defer.promise;
      },
      getReviews: function(projectID) {
         if(!projectID) {
            $state.go('project-search');
            return;
         }
         var defer = $q.defer();
         db.ref('projectReviews/'+cityID+'/residential/'+projectID).once('value').then(function(snapshot) {
            // console.log(snapshot.val());
            var result = {};
            var percentage = {
               total: {
                  parameters: {
                     security: 0,
                     openAndGreenArea: 0,
                     consQualAndMaintenance: 0,
                     shopsAndServicesInCommunity: 0,
                     clubhouseSportsActivities: 0 
                  }
               },
               reviews: 0,
               parameters: {
                  security: 0,
                  openAndGreenArea: 0,
                  consQualAndMaintenance: 0,
                  shopsAndServicesInCommunity: 0,
                  clubhouseSportsActivities: 0 
               },
               closeBy: {
                  market: 0,
                  school: 0,
                  hospital: 0 
               },
               recommendedFor: {
                  kids: 0,
                  pets: 0,
                  elders: 0,
                  singles: 0
               },
               convenientlyLocated: 0,
               publicTransportAccessible: 0,
               projectRating: 0
            };
            result['projectReview'] = snapshot.val();
            angular.forEach(snapshot.val(), function(value, key) {
               percentage.reviews+=1;
               // CloseBy
               if(value.closeBy) {
                  if(value.closeBy.market) {
                     percentage.closeBy.market+=1;
                  };
                  if(value.closeBy.school) {
                     percentage.closeBy.school+=1;
                  }
                  if(value.closeBy.hospital) {
                     percentage.closeBy.hospital+=1;
                  }
               }

               // Parameters
               if(value.ratings) {
                  if(value.ratings.security) {
                     percentage.parameters.security+=value.ratings.security;
                     percentage.total.parameters.security += 1;
                  }
                  if(value.ratings.openAndGreenArea) {
                     percentage.parameters.openAndGreenArea+=value.ratings.openAndGreenArea;
                     percentage.total.parameters.openAndGreenArea += 1;
                  }
                  if(value.ratings.consQualAndMaintenance) {
                     percentage.parameters.consQualAndMaintenance+=value.ratings.consQualAndMaintenance;
                     percentage.total.parameters.consQualAndMaintenance += 1;
                  }
                  if(value.ratings.shopsAndServicesInCommunity) {
                     percentage.parameters.shopsAndServicesInCommunity+=value.ratings.shopsAndServicesInCommunity;
                     percentage.total.parameters.shopsAndServicesInCommunity += 1;
                  }
                  if(value.ratings.clubhouseSportsActivities) {
                     percentage.parameters.clubhouseSportsActivities+=value.ratings.clubhouseSportsActivities;
                     percentage.total.parameters.clubhouseSportsActivities += 1;
                  }
               }

               // recommendedFor
               if(value.recommendedFor) {
                  if(value.recommendedFor.kids) {
                     percentage.recommendedFor.kids+=1;
                  }
                  if(value.recommendedFor.pets) {
                     percentage.recommendedFor.pets+=1;
                  }
                  if(value.recommendedFor.elders) {
                     percentage.recommendedFor.elders+=1;
                  }
                  if(value.recommendedFor.singles) {
                     percentage.recommendedFor.singles+=1;
                  }
               }

               // Others
               if(value.convenientlyLocated) {
                  percentage.convenientlyLocated+=1;
               }
               if(value.projectRating) {
                  percentage.projectRating += value.projectRating;
               }
               if(value.publicTransportAccessible) {
                  percentage.publicTransportAccessible+=1;
               }
            });
            console.log(percentage);

            // NOTE
            // When Calculating Keep In Mind That Some Will Skip Some Rating But Still Rate Other Parts
            // This Will Increase The Total Review But The Total Inputs To Rating Will Be Less
            // This Will Create Disambiguity.

            // Now Calculate Percentage
            var total = percentage.reviews;
            // Parameters

            percentage.parameters.security = percentage.total.parameters.security === 0 ? 0 : percentage.parameters.security/(10*percentage.total.parameters.security)*100;
            percentage.parameters.openAndGreenArea = percentage.parameters.openAndGreenArea === 0 ? 0 : percentage.parameters.openAndGreenArea/(10*percentage.total.parameters.openAndGreenArea)*100;
            percentage.parameters.consQualAndMaintenance = percentage.parameters.consQualAndMaintenance === 0 ? 0 : percentage.parameters.consQualAndMaintenance/(10*percentage.total.parameters.consQualAndMaintenance)*100;
            percentage.parameters.shopsAndServicesInCommunity = percentage.parameters.shopsAndServicesInCommunity === 0 ? 0 : percentage.parameters.shopsAndServicesInCommunity/(10*percentage.total.parameters.shopsAndServicesInCommunity)*100;
            percentage.parameters.clubhouseSportsActivities = percentage.parameters.clubhouseSportsActivities === 0 ? 0 : percentage.parameters.clubhouseSportsActivities/(10*percentage.total.parameters.clubhouseSportsActivities)*100;

            // Close By
            percentage.closeBy.market = total === 0 ? 0 : percentage.closeBy.market/total*100;
            percentage.closeBy.school = total === 0 ? 0 : percentage.closeBy.school/total*100;
            percentage.closeBy.hospital = total === 0 ? 0 : percentage.closeBy.hospital/total*100;

            // Recommended For
            percentage.recommendedFor.kids = total === 0 ? 0 : percentage.recommendedFor.kids/total*100;
            percentage.recommendedFor.pets = total === 0 ? 0 : percentage.recommendedFor.pets/total*100;
            percentage.recommendedFor.elders = total === 0 ? 0 : percentage.recommendedFor.elders/total*100;
            percentage.recommendedFor.singles = total === 0 ? 0 : percentage.recommendedFor.singles/total*100;

            //  Others
            percentage.convenientlyLocated = total === 0 ? 0 : percentage.convenientlyLocated/total*100;
            // Not The Percentage This Is Average Rating
            console.log(total);
            console.log(percentage.projectRating);
            percentage.projectRating = total === 0 ? 0 : percentage.projectRating/total;
            percentage.publicTransportAccessible = total === 0 ? 0 : percentage.publicTransportAccessible/total*100;
            
            result['percentageReview'] = percentage;
            $rootScope.projectReview = result['projectReview'];
            $rootScope.percentageReview = result['percentageReview'];
            console.log(result);
            defer.resolve(result);
         }, function(error) {
            defer.reject(error);
         });
         return defer.promise;
      }
   };
   return Obj;
})

.service('PricingFilterService', function($q, $rootScope) {
   var Obj = {};
   var cityID = '-KN7HFa3un2SPyrUKosy';
   Obj = {
      // Filter Screen
      getSizes: function() {
         var defer = $q.defer();
         var result = [];
         angular.forEach($rootScope.project.units.configurations, function(obj){
            result.push({
               type: obj.type,
               superArea: obj.superArea,
               propertyType: obj.propertyType
            });
         })   
         defer.resolve(result);
         return defer.promise;
      },
      filterProject: function(filter) {
         console.log(filter);
         var defer = $q.defer();
         var result = {};
         angular.forEach($rootScope.project.units.configurations, function(obj) {
            if(obj.type === filter.pBHK && obj.superArea === filter.pSize && obj.propertyType === filter.propertyType) {
               response = obj;
            }
            else {
               response = null;
            }
         });
         defer.resolve(response);
         return defer.promise;
      },
      filterProjectFromAggregator: function(value) {
         console.log(value);
         var defer = $q.defer();
         var operation = value.buy ? 'buy':'rent';
         var bhkOption = value.pBHK+'BHK';
         // var result = {
         //    aggregator: {
         //       buy: {
         //          '99acres': {},
         //          commonFloor: {},
         //          magicBricks: {}
         //       },
         //       rent: {
         //          '99acres': '',
         //          commonFloor: '',
         //          magicBricks: ''
         //       },
         //       url: {
         //          acresbuy: null,
         //          acresrent: null,
         //          commonbuy: null,
         //          commonrent: null,
         //          magicbuy: null,
         //          magicrent: null
         //       }
         //    }
         // };
         // if($rootScope.project['aggregator']) {
         //    if($rootScope.project['aggregator'][operation]) {
         //       if($rootScope.project['aggregator'][operation]['99acres']) {
         //          if($rootScope.project['aggregator'][operation]['99acres'][bhkOption]) {
         //             result['aggregator'][operation]['99acres'][bhkOption] = $rootScope.project['aggregator'][operation]['99acres'][bhkOption];
         //          }
         //       }
         //       if($rootScope.project['aggregator'][operation]['commonFloor']) {
         //          if($rootScope.project['aggregator'][operation]['commonFloor'][bhkOption]) {
         //             result['aggregator'][operation]['commonFloor'][bhkOption] = $rootScope.project['aggregator'][operation]['commonFloor'][bhkOption];
         //          }
         //       }
         //       if($rootScope.project['aggregator'][operation]['magicBricks']) {
         //          if($rootScope.project['aggregator'][operation]['magicBricks'][bhkOption]) {
         //             result['aggregator'][operation]['magicBricks'][bhkOption] = $rootScope.project['aggregator'][operation]['magicBricks'][bhkOption];
         //          }
         //       }
         //    }
         // }
         // if(value.buy) {
         //    if($rootScope.project['aggregator']) {
         //       if($rootScope.project['aggregator'].url) {
         //          if($rootScope.project['aggregator'].url.acresbuy) {
         //             result['aggregator'].url.acresbuy = $rootScope.project['aggregator'].url.acresbuy;                  
         //          }
         //          if($rootScope.project['aggregator'].url.magicbuy) {
         //             result['aggregator'].url.magicbuy = $rootScope.project['aggregator'].url.magicbuy                  
         //          }
         //          if($rootScope.project['aggregator'].url.commonbuy) {
         //             result['aggregator'].url.commonbuy = $rootScope.project['aggregator'].url.commonbuy                  
         //          }
         //       }
         //    }
         // }
         // else {
         //    if($rootScope.project['aggregator'].url) {
         //       if($rootScope.project['aggregator'].url.acresrent) {
         //          result['aggregator'].url.acresrent = $rootScope.project['aggregator'].url.acresrent                  
         //       }
         //       if($rootScope.project['aggregator'].url.magicrent) {
         //          result['aggregator'].url.magicrent = $rootScope.project['aggregator'].url.magicrent                  
         //       }
         //       if($rootScope.project['aggregator'].url.commonrent) {
         //          result['aggregator'].url.commonrent = $rootScope.project['aggregator'].url.commonrent                  
         //       }
         //    }
         // }
         var result = {};
         result = $rootScope.project.aggregator;
         console.log(result);
         defer.resolve(result);
         return defer.promise;
      }
   };
   return Obj;
})
;