angular.module('Rent.Lease')
  .controller('FeeRoomsboardCtrl',
    function($uibModal, $stateParams, LeaseModel) {
      var feeroomsboard = this;

      LeaseModel.ContractRoomsRestResource
        .getList()
        .then(function(rooms){
          feeroomsboard.AllRooms = rooms;
      });

      LeaseModel.restResource.getList().then(function(buildings){
        feeroomsboard.AllBuildings = buildings;
      });

      feeroomsboard.buildingName=""

      feeroomsboard.openSignModal = function(aRoom){
        $uibModal.open({
          templateUrl: "/view/rent/lease/signRoomModal.html",
          controller: "LeaseRoomSignModalCtrl",
          controllerAs: "leaseRoomSignModal",
          resolve: {
            room:aRoom
          }
        });
      }

      feeroomsboard.viewSignModal = function(aRoom){
        $uibModal.open({
          templateUrl: "/view/rent/lease/viewSignRoomModal.html",
          controller: "LeaseViewRoomSignModalCtrl",
          controllerAs: "leaseViewRoomSignModal",
          resolve: {
            room:aRoom
          }
        });
      }

    });
