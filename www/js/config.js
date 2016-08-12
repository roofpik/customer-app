app.config(function($stateProvider, $urlRouterProvider) {


    // App starting controller

    $stateProvider.state('app-start', {
        url: '/app-start',
        abstract: false,
        templateUrl: 'templates/app/app-start.html',
        controller: 'appStartCtrl'
    });

    // App landing controller
    $stateProvider.state('landing', {
        url: '/landing',
        abstract: false,
        templateUrl: 'templates/app/landing.html',
        controller: 'appLandingCtrl'
    });

    //Intro Slider
    $stateProvider.state('intro-slider', {
        url: '/intro-slider',
        templateUrl: 'templates/app/intro-slider.html',
        controller: 'IntroSliderCtrl'
    });

    //Under Construction
    $stateProvider.state('under-construction', {
        url: '/under-construction',
        templateUrl: 'templates/app/under-construction.html',
        controller: 'underConstructionCtrl'
    });

    //
    $stateProvider.state('app-update', {
        url: '/app-update',
        templateUrl: 'templates/app/app-update.html',
        controller: 'appUpdateCtrl'
    });

    $stateProvider.state('network', {
        url: '/network',
        templateUrl: 'templates/app/network.html',
        controller: 'networkCtrl'
    });


    $stateProvider.state('bee-social', {
        url: '/bee-social',
        templateUrl: 'templates/app/bee-social.html',
        controller: 'beeSocialCtrl'
    });



    //State for login
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'templates/auth/login.html',
        controller: 'LoginCtrl'
    });

    //State for logout
    $stateProvider.state('logout', {
        url: '/logout',
        templateUrl: 'templates/auth/logout.html',
        controller: 'LogoutCtrl'
    });

    //State for signup
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'templates/auth/signup.html',
        controller: 'SignupCtrl'
    });


    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/home/side-menu.html',
        controller: 'sideMenuCtrl'
    });

    $stateProvider.state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home/home.html',
                controller: 'HomeCtrl'
            }
        }
    });

    $stateProvider.state('refer', {
        url: '/refer',
        templateUrl: 'templates/user/refer.html',
        controller: 'referCtrl',
        resolve: {
            currentAuth: function(AuthenticationService) {
                return AuthenticationService.checkAuthentication();
            }
        }
    });

    $stateProvider.state('select-location', {
        url: '/select-location',
        templateUrl: 'templates/home/select-location.html',
        controller: 'selectLocationCtrl'
    });

    $stateProvider.state('project-search', {
        url: '/project-search/:type',
        templateUrl: 'templates/home/project-search.html',
        controller: 'ProjectSearchCtrl'
    });

    $stateProvider.state('review', {
        url: '/review/:id/:name/:landmark/:city',
        templateUrl: 'templates/projects/review.html',
        controller: 'ReviewCtrl',
        resolve: {
            currentAuth: function(AuthenticationService) {
                return AuthenticationService.checkAuthentication();
            }
        }
    });

    $stateProvider.state('properties', {
        url: '/properties/:from',
        templateUrl: 'templates/projects/properties.html',
        controller: 'PropertiesCtrl'
    });

    $stateProvider.state('nearby', {
        url: '/nearby',
        templateUrl: 'templates/projects/nearby.html',
        controller: 'nearbyCtrl'
    });

    $stateProvider.state('terms-n-conditions', {
        url: '/terms-n-conditions',
        templateUrl: 'templates/legal/terms-n-conditions.html',
        controller: 'termsConditionsCtrl'
    });

    $stateProvider.state('privacy-policy', {
        url: '/privacy-policy',
        templateUrl: 'templates/legal/privacy-policy.html',
        controller: 'privacyPolicyCtrl'
    });

    $stateProvider.state("profile", {
        url: '/profile',
        templateUrl: 'templates/user/profile.html',
        controller: 'profileCtrl',
        resolve: {
            currentAuth: function(AuthenticationService) {
                return AuthenticationService.checkAuthentication();
            }
        }

    });

    $stateProvider.state("residential-review", {
        url:'/residential-review',
        templateUrl: 'templates/reviews/residential-review.html',
        controller: 'residentialReviewCtrl'
    })

    $urlRouterProvider.otherwise('/app-start');
});
