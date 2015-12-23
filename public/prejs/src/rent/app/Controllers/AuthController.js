(function() {
  'use strict';
  angular
        .module('Rent.Common')
        .controller('AuthController', AuthController);

  function AuthController($auth, $rootScope, $state, store, $http) {
      var vm = this;
      vm.login = function() {
          var credentials = {
              email: vm.email,
              password: vm.password
          }
          // Use Satellizer's $auth service to login
          $auth.login(credentials).then(function(data) {
               return $http.get('api/authenticate/user');
          },function(error) {
                vm.loginError = true;
                vm.loginErrorText = error.data.error;
            }).then(function(response){
              if(response){
                var user = response.data.user;
                store.set('user', user);
                $rootScope.authenticated = true;
                $rootScope.currentUser = user;

                $rootScope.$broadcast('userLoggedIn',{user:user});
                if(user.role == 1) {
                  $state.go("rent.lease.rentroomsboard");
                } else if(user.role == 2) {
                  $state.go("rent.fee.feestatisticboard");
                } else if(user.role == 3) {
                  $state.go("rent.lease.rentroomsboard");
                }
              }
            },function(error){
              console.log('error');
            });
      }
  }
})();
