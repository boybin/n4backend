(function() {
  'use strict';
  var rentModule = angular.module('Rent', [
    'Rent.Common',
    'Rent.Fee',
    'Rent.Building',
    'Rent.Lease',
    'angular-storage',
    'ngMessages',
    'ngFileSaver',
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

  rentModule.config(function($stateProvider, $httpProvider, $urlRouterProvider, $authProvider, $locationProvider, RestangularProvider, $provide) {
    $authProvider.loginUrl = '/api/authenticate';
    RestangularProvider.setBaseUrl('/api/rent');
    $urlRouterProvider.otherwise("/rent/login");

    $provide.factory('redirectWhenLoggedOut', function($q, $injector) {
      return {
        responseError: function(rejection) {
          var $state = $injector.get('$state');
          var store = $injector.get('store');
          var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

          angular.forEach(rejectionReasons, function(value, key) {
            if (rejection.data.error === value) {
              store.remove('user');
              $state.go('login');
            }
          });
            return $q.reject(rejection);
        }
      }
    });
    // Push the new factory onto the $http interceptor array
    $httpProvider.interceptors.push('redirectWhenLoggedOut');

    $stateProvider
        .state('rent', {
          url: "/rent",
          abstract: true,
          templateUrl: '/view/rent/layout/layout.html'
        })
        .state('login', {
          url: "/rent/login",
          templateUrl:"/auth/login"
        })
        .state('rent.user', {
          url: "/user",
          abstract: true,
          views:{
              'status':{template:'status'},
              '':{template: '<ui-view/>'}
          }
        })
        .state('rent.building', {
          url: "/building",
          abstract: true,
          views:{
              'status':{template:'status'},
              '':{template: '<ui-view/>'}
          }
        })
        .state('rent.fee', {
          url:"/fee",
          abstract: true,
          views:{
              'status':{template:'status'},
              '':{template: '<ui-view/>'}
          }
        })
        .state('rent.lease', {
          url:"/lease",
          abstract: true,
          views:{
              'status':{template:'status'},
              '':{template: '<ui-view/>'}
          }
        })
        .state('rent.user.userboard', {
          url: "/userboard",
          templateUrl:"/view/user/userboard.html",
          controller:"UserboardCtrl as userboard"
        })
        .state('rent.building.buildingboard', {
          url: "/buildingboard",
          templateUrl:"/view/rent/building/buildingboard.html",
          controller:"BuildboardCtrl as buildboard"
        })
        .state('rent.building.roomboard', {
          url:"/{building_id}/roomboard",
          templateUrl:"/view/rent/building/roomboard.html",
          controller:"BRoomboardCtrl as roomboard"
        })
        .state('rent.fee.feemetaboard', {
          url:"/feemetaboard",
          templateUrl:"/view/rent/fee/feemetaboard.html",
          controller:"FeeMetaboardCtrl as feemetaboard"
        })
        .state('rent.fee.feemetaplans', {
          url:"/feemetaplans",
          templateUrl:"/view/rent/fee/feemetaplans.html",
          controller:"FeeMetaPlansCtrl as feemetaplans"
        })
        .state('rent.fee.feeroomsboard', {
          url:"/feeroomsboard",
          templateUrl:"/view/rent/fee/feeroomsboard.html",
          controller:"FeeRoomsboardCtrl as feeroomsboard"
        })
        .state('rent.fee.feeboard', {
          url:"/feeboard",
          templateUrl:"/view/rent/fee/feeboard.html",
          controller:"FeeboardCtrl as feeboard"
        })
        .state('rent.fee.feestatisticboard', {
          url:"/feestatisticboard",
          templateUrl:"/view/rent/fee/feestatisticboard.html",
          controller:"FeeStatisticboardCtrl as feestatisticboard"
        })
        .state('rent.fee.feeplanboard', {
          url:"/feeplanboard",
          templateUrl:"/view/rent/fee/feeplanboard.html",
          controller:"FeePlanboardCtrl as feeplanboard"
        })
        .state('rent.lease.leaseboard', {
          url:"/leaseboard",
          templateUrl:"/view/rent/lease/rentbuildings.html",
          controller:"LeaseboardCtrl as leaseboard"
        })
        .state('rent.lease.leaseroomboard', {
          url:"/{building_id}/leaseroomboard",
          templateUrl:"/view/rent/lease/rentrooms.html",
          controller:"LRoomboardCtrl as leaseroomboard"
        })
        .state('rent.lease.rentroomsboard', {
          url:"/rentroomsboard",
          templateUrl:"/view/rent/lease/rentroomsboard.html",
          controller:"RentRoomsboardCtrl as rentroomsboard"
        })

    $locationProvider.html5Mode(true);
  });

  rentModule.run(
    function($rootScope, $state, $location, $http, store, CommonUtilService/*, editableOptions*/) {
      // editableOptions.theme = 'bs3';
      $rootScope.rentCommonUtils = CommonUtilService;
      $rootScope.$on('$stateChangeStart', function(event, toState) {
          var user = store.get('user');
          // If there is any user data in local storage then the user is quite
          // likely authenticated. If their token is expired, or if they are
          // otherwise not actually authenticated, they will be redirected to
          // the auth state because of the rejected request anyway
          if(user) {
              $rootScope.authenticated = true;
              $rootScope.currentUser = user;
              if(toState.name === "login") {
                  event.preventDefault();
                  $state.go('rent.building.buildingboard');
              }
          }
      });

    });

})();
