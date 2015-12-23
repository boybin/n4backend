angular.module('Rent.Fee', []);

angular.module('Rent.Lease')
  .controller('FeeStatusCtrl',
    function(CommonModel) {
      var vm = this;
      CommonModel.statusRestResource.one(3).get().then(function(ret){
        vm.feePlanNumber = ret.feePlanNumber;
        vm.feePlanRentNumber = ret.feePlanRentNumber;
      })

  });
