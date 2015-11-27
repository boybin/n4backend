(function() {
  'use strict';
  angular
        .module('Rent.Common')
        .controller('AuthController', AuthController);

  function AuthController($auth) {
      var vm = this;
      vm.login = function() {
          var credentials = {
              email: vm.email,
              password: vm.password
          }
          // Use Satellizer's $auth service to login
          $auth.login(credentials).then(function(data) {
              // If login is successful, redirect to the users state
              console.log("Yes");
              console.log(data);
          });
      }
  }
})();
