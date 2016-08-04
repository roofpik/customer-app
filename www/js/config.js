app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/app/side-menu.html',
        controller: 'AppCtrl'
    })

    // .state('app.search', {
    //     url: '/search',
    //     views: {
    //         'menuContent': {
    //             templateUrl: 'templates/search.html'
    //         }
    //     }
    // })

    // .state('app.browse', {
    //         url: '/browse',
    //         views: {
    //             'menuContent': {
    //                 templateUrl: 'templates/browse.html'
    //             }
    //         }
    //     })
    //     .state('app.playlists', {
    //         url: '/playlists',
    //         views: {
    //             'menuContent': {
    //                 templateUrl: 'templates/playlists.html',
    //                 controller: 'PlaylistsCtrl'
    //             }
    //         }
    //     })

    .state('landing', {
        url: '/landing',
        abstract: false,
        templateUrl: 'templates/app/landing.html',
        controller: 'appLandingCtrl'
    })


    .state('intro-slider', {
        url: '/intro-slider',
        templateUrl: 'templates/app/intro-slider.html',
        controller: 'IntroSliderCtrl'
    });

    $stateProvider.state('underconstruction', {
        url: '/underconstruction',
        templateUrl: 'templates/app/underconstruction.html',
        controller: 'underconstructionCtrl'
    });


    $stateProvider.state('update', {
        url: '/update',
        templateUrl: 'templates/app/update.html',
        controller: 'updateCtrl'
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

    // .state('app.single', {
    //     url: '/playlists/:playlistId',
    //     views: {
    //         'menuContent': {
    //             templateUrl: 'templates/playlist.html',
    //             controller: 'PlaylistCtrl'
    //         }
    //     }
    // });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/landing');
});
