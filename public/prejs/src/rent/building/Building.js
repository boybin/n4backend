angular.module('Rent.Building', []);

angular.module('Rent.Lease')
  .controller('BuildingStatusCtrl',
    function(CommonModel) {
      var vm = this;
      CommonModel.statusRestResource.one(1).get().then(function(ret){
        vm.buildingNumber = ret.buildingNumber;
        vm.roomNumber = ret.roomNumber;
      })

  });
