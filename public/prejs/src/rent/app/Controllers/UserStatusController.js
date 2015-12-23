angular.module('Rent.Common')
  .controller('UserStatusCtrl',
    function(CommonModel) {
      var vm = this;
      CommonModel.statusRestResource.one(4).get().then(function(ret){
        vm.userCount = ret.userCount;
      })

  });
