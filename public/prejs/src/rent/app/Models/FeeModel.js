angular.module('Rent.Common')
    .service('FeeModel',
        function (Restangular) {
            var service = this;
            service.restResource = Restangular.service('feemetas');
            service.feeMetaPlanRestResource = Restangular.service('feemetaplans');
            service.contractFeePlanRestResource = Restangular.service('contractfeeplans');
    });
