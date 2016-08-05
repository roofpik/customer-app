app.controller('ProjectSearchCtrl', function($scope, $state, $timeout, $stateParams, $ionicLoading) {

    $ionicLoading.show();
    console.log($stateParams);
    var type= $stateParams.type;
    console.log(type);
    $scope.gotoHome = function() {
        $state.go('app.home');
    }

    var allProjects;
    $scope.projects = [];

    $timeout(function() {
        allProjects = JSON.parse(window.localStorage['allProjectsData'] || {});
        angular.forEach(allProjects, function(value, key){
            $scope.projects.push(value);
        });
    }, 500)

    $timeout(function() {
        $ionicLoading.hide();
    }, 2000)

    $scope.selectProject = function(project){
        console.log(project);
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
