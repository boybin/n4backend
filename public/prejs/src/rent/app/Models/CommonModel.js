angular.module('Rent.Common')
    .service('CommonModel',
        function (Restangular) {
            var service = this;
            service.statusRestResource = Restangular.service('status');
    });
