(function() {
  'use strict';
  angular
        .module('Rent.Common')
        .controller('UserboardCtrl', UserBoardController);

        function UserBoardController($uibModal, UserModel) {
            var vm = this;
            UserModel.restResource.getList().then(function(users){
              vm.AllUser = users;
            });

            vm.openUser = function(aUser) {
              $uibModal.open({
                templateUrl: "/view/user/editusermodal.html",
                controller: "editUserModalCtrl",
                controllerAs: "editUserModal",
                resolve: {
                  user:aUser
                }
              });
            }
        }
})();

angular.module('Rent.Common')
  .controller('editUserModalCtrl',
    function($uibModalInstance, $scope, UserModel, user) {
      var vm = this;
      vm.AllRoles = UserModel.AllRoles;
      vm.user = user.clone();
      for(var roleKey in vm.AllRoles) {
        var role = vm.AllRoles[roleKey];
        if(role.value == vm.user.role) {
          vm.selectedRole = role;
          break;
        }
      }

      vm.cancel = function(){
        $uibModalInstance.close();
      };

      vm.save = function(){
        var editUserForm = $scope['editUserForm'];
        if ($scope.rentCommonUtils.validateForm($scope, editUserForm) && confirm("编辑用户?")) {
          user.nick = vm.user.nick;
          user.role = vm.selectedRole.value;
          user.save().then(function() {
            alert("保存成功!");
            $uibModalInstance.close();
          }, function(){
            alert("保存失败!");
          });
        }
      };

    });
