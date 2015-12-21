angular.module('Rent.Common')
    .controller('MainCtrl',
      function ($scope, $auth, $rootScope, store, $state) {
        //Tab hightlight
        var main = this;
        main.$state = $state;
        //---------------------------------//

        main.logout = function() {
            $auth.logout().then(function() {
                store.remove('user');
                $rootScope.authenticated = false;
                $rootScope.currentUser = null;
                $state.go('login');
            });
          };
    });
