angular.module('Rent.Common')
    .service('BuildingModel',
        function (Restangular) {
            var service = this;
            service.restResource = Restangular.service('buildings');
      });
