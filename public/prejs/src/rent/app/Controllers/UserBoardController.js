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

            vm.openAddUserModal = function() {
              $uibModal.open({
                templateUrl: "/view/user/addusermodal.html",
                controller: "addUserModalCtrl",
                controllerAs: "addUserModal",
                resolve:{
                  users:function() {
                    return vm.AllUser;
                  }
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

    angular.module('Rent.Common')
      .controller('addUserModalCtrl',
        function($uibModalInstance, $scope, UserModel, users) {
          var vm = this;
          vm.cancel = function() {
            $uibModalInstance.close();
          };
          vm.AllRoles = UserModel.AllRoles;

          vm.newUser = {
            email:"",
            name:"",
            nick:"",
            role:1,
            password:""
          }

          vm.save = function() {
            vm.newUser.role = vm.selectedRole.value;
            var addUserForm = $scope['addUserForm'];
            if ($scope.rentCommonUtils.validateForm($scope, addUserForm) && confirm("添加用户?")) {
              UserModel.restResource.post(vm.newUser).then(function(user){
                alert("保存成功!");
                users.push(user);
                $uibModalInstance.close();
              }, function() {
                alert("保存失败!");
              });
            }
          };

        });
