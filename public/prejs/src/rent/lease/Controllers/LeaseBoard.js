angular.module('Rent.Lease')
  .controller('LeaseboardCtrl',
    function($uibModal, LeaseModel) {
      var leaseboard = this;
      console.log("yes");
      LeaseModel.restResource.getList().then(function(buildings){
        leaseboard.AllBuildings = buildings;
      });
    });
