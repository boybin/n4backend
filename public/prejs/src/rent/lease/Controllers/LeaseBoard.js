angular.module('Rent.Lease')
  .controller('LeaseboardCtrl',
    function($uibModal, LeaseModel) {
      var leaseboard = this;
      LeaseModel.restResource.getList().then(function(buildings){
        leaseboard.AllBuildings = buildings;
      });

      leaseboard.openBuildingLeaseInfo = function(aBuilding) {
        $uibModal.open({
          templateUrl: "/view/rent/lease/leaseBuildingDetailModal.html",
          controller: "LeaseBuildingDetailModalCtrl",
          controllerAs: "leaseBuildingModal",
          resolve: {
            building:aBuilding
          }
        });
      }

      leaseboard.filterHasEmptyRoom = "";
      leaseboard.filterStatus = function(status){
        leaseboard.filterHasEmptyRoom = status;
      }
    });


angular.module('Rent.Lease')
  .controller('LeaseBuildingDetailModalCtrl',
    function($uibModalInstance, building) {
      var leaseBuildingModal = this;
      leaseBuildingModal.building = building;

      leaseBuildingModal.close = function(){
        $uibModalInstance.close();
      };
    }
  );
