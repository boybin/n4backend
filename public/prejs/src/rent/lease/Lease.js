angular.module('Rent.Lease', []);

angular.module('Rent.Lease')
  .controller('LeaseStatusCtrl',
    function(CommonModel) {
      var vm = this;
      CommonModel.statusRestResource.one(2).get().then(function(ret){
        vm.roomNumber = ret.roomNumber;
        vm.rentedNumber = ret.rentedNumber;
        vm.emptyNumber = ret.emptyNumber;
      })

  });
