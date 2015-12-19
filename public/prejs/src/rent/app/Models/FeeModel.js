angular.module('Rent.Common')
    .service('FeeModel',
        function (Restangular) {
            var service = this;
            service.restResource = Restangular.service('feemetas');
            service.feeMetaPlanRestResource = Restangular.service('feemetaplans');
            service.contractFeePlanRestResource = Restangular.service('contractfeeplans');
            service.feePlanRoomsRestResource = Restangular.service('feeplanrooms');
            service.feeRecordRestResource = Restangular.service('feerecords');
            service.feeRecordStaticsRestResource = Restangular.service('feerecordstatistics');
            service.feePlanSearchRestResource = Restangular.service('searchfeeplans');
    });
