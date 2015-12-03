(function() {
  'use strict';
  var rentModule = angular.module('Rent', [
    'ngRoute',
    'ngResource',
    'Rent.Common',
    'Rent.Bill',
    'Rent.Building',
    'Rent.Lease',
    'angular-storage',
    'angular.filter',
    'ui.select',
    'ngSanitize',
    'ui.bootstrap',
    'satellizer',
    'AngularPrint'
  ]);

  rentModule.config(function($routeProvider, $locationProvider, $authProvider) {
    $authProvider.loginUrl = '/api/authenticate';
/*    $routeProvider
      .when('/auth', {
        templateUrl: '/auth/login',
        controller: 'AuthController',
        controllerAs: 'auth'
      })
      .when('users',{
        templateUrl: '../views/userView.html',
        controller: 'UserController',
        controllerAs: 'user'
      })
      .otherwise({
        redirectTo: '/auth'
      });
      */

      $locationProvider.html5Mode(true);
  });

  rentModule.run(
    function($rootScope, $location, $http, store) {
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
