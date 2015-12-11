angular.module('Rent.Lease')
  .controller('LeaseboardCtrl',
    function($uibModal, LeaseModel) {
      var leaseboard = this;
      LeaseModel.restResource.getList().then(function(buildings){
        leaseboard.AllBuildings = buildings;
      });

      leaseboard.openBuildingLeaseInfo = function(aBuilding) {
        $uibModal.open({
          templateUrl: "/view/rent/lease/LeaseBuildingDetailModal.html",
          controller: "LeaseBuildingDetailModalCtrl",
          controllerAs: "leaseBuildingModal",
          resolve: {
            building:aBuilding
          }
        });
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
