angular.module('Rent.Common')
    .service('UserModel',
        function (Restangular) {
            var service = this;
            service.restResource = Restangular.service('users');

            service.AllRoles = [
              {id:1, name:"管理员", value:1},
              {id:2, name:"财务人员", value:2},
              {id:3, name:"操作人员", value:3},
            ];
    });
