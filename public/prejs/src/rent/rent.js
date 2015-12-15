(function() {
  'use strict';
  var rentModule = angular.module('Rent', [
    'Rent.Common',
    'Rent.Fee',
    'Rent.Building',
    'Rent.Lease',
    'angular-storage',
    'ngMessages',
    'angular.filter',
    'ui.select',
    'ngSanitize',
    'ui.bootstrap',
    'ui.router',
    'satellizer',
    'AngularPrint',
    'restangular'
    // 'xeditable'
  ]);

  rentModule.config(function($stateProvider, $urlRouterProvider, $authProvider, $locationProvider, RestangularProvider) {
    $authProvider.loginUrl = '/api/authenticate';
    RestangularProvider.setBaseUrl('/api/rent');
    $urlRouterProvider.otherwise("/rent");

    $stateProvider
        .state('rent', {
          url: "/rent",
          templateUrl: "/view/rent/default.html"
        })
        .state('buildingboard', {
          url: "/rent/building/buildingboard",
          templateUrl: "/view/rent/building/buildingboard.html",
          controller:"BuildboardCtrl as buildboard"
        })
        .state('roomboard', {
          url:"/rent/building/{building_id}/roomboard",
          templateUrl:"/view/rent/building/roomboard.html",
          controller:"BRoomboardCtrl as roomboard"
        })
        .state('feemetaboard', {
          url:"/rent/fee/feemetaboard",
          templateUrl:"/view/rent/fee/feemetaboard.html",
          controller:"FeeMetaboardCtrl as feemetaboard"
        })
        .state('feeboard', {
          url:"/rent/fee/feeboard",
          templateUrl:"/view/rent/fee/feeboard.html",
          controller:"FeeboardCtrl as feeboard"
        })
        .state('leaseboard', {
          url:"/rent/lease/leaseboard",
          templateUrl:"/view/rent/lease/rentbuildings.html",
          controller:"LeaseboardCtrl as leaseboard"
        })
        .state('leaseroomboard', {
          url:"/rent/lease/{building_id}/leaseroomboard",
          templateUrl:"/view/rent/lease/rentrooms.html",
          controller:"LRoomboardCtrl as leaseroomboard"
        })
        .state('rentroomsboard', {
          url:"/rent/lease/rentroomsboard",
          templateUrl:"/view/rent/lease/rentroomsboard.html",
          controller:"RentRoomsboardCtrl as rentroomsboard"
        })

    $locationProvider.html5Mode(true);
  });

  rentModule.run(
    function($rootScope, $location, $http, store/*, editableOptions*/) {
      // editableOptions.theme = 'bs3';
      $rootScope.globals = store.get('globals') || {};
      if ($rootScope.globals && $rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.token;
      }
/*
      $rootScope.$on('$locationChangeStart', function(event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
        var loggedIn = $rootScope.globals && $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
          $location.path('/login');
        }
      });*/
    });

})();
