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
                $rootScope.title = "物流房屋出租管理系统";
                
                $state.go('login');
            });
          };

        var getMenu = function(){
            var random = Math.random();
            return "/rent/nav/"+random;
        }
        $rootScope.navUrl = getMenu();
        $rootScope.title = "物流房屋出租管理系统";

        $rootScope.$on('userLoggedIn', function(event,args) {
          $rootScope.navUrl = null;
          $rootScope.navUrl = getMenu();
          if ($rootScope.currentUser.role == 1) {
            $rootScope.title = "管理员" + "-" + $rootScope.title;
          } else if ($rootScope.currentUser.role == 2) {
            $rootScope.title = "财务人员" + "-" + $rootScope.title ;
          } else if ($rootScope.currentUser.role == 3) {
            $rootScope.title = "操作人员" + "-" + $rootScope.title ;
          }
        });
    });
