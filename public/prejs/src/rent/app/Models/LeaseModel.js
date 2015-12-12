angular.module('Rent.Common')
    .service('LeaseModel',
        function (Restangular) {
            var service = this;
            service.restResource = Restangular.service('rentbuildings');
            service.contractRestResource = Restangular.service('contracts')

    });
