app.controller('ProjectSearchCtrl', function($scope, $state, $timeout, $stateParams, $ionicLoading) {

    var type= $stateParams.type;
    console.log(type);
    $ionicLoading.show({
      template: 'Loading...'
    });

    $scope.gotoHome = function() {
        $state.go('app.home');
    }

    $scope.selectedLocation = JSON.parse(window.localStorage['selectedLocation'] || {});

    $scope.projects = [];

    var allProjects = JSON.parse(window.localStorage['allProjectsData'] || {});
    angular.forEach(allProjects, function(value, key){
        $scope.projects.push(value);
    });

    $timeout(function(){
        $ionicLoading.hide();
    }, 1000);

    $scope.selectProject = function(project){
        console.log(project);
        console.log(type);
        if(type == 'review'){
            $state.go('review', {id:project.projectId, name: project.projectName, landmark: project.projectDetails.address.landmark, city: $scope.selectedLocation.cityId});
        } else {
            $state.go('projectDetails.overview', {projectId:project.projectId});
        }
    };

    $scope.goBack = function(){
        $state.go('app.home');
    }
});
