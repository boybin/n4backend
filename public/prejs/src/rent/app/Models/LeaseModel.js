angular.module('Rent.Common')
    .service('LeaseModel',
        function (Restangular) {
            var service = this;
            service.restResource = Restangular.service('rentbuildings');
            service.rentRoomsRestResource = Restangular.service('rentrooms');
            service.contractRestResource = Restangular.service('contracts');
            service.ContractRoomsRestResource = Restangular.service('contractrooms');
            service.ContractImagesRestResource = Restangular.service('contractimages');
            service.RoomHistoryRestResource = Restangular.service('roomhistory');
    });
