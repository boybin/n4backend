angular.module('Rent.Lease')
  .controller('RentRoomsboardCtrl',
    function($uibModal, $stateParams, LeaseModel) {
      var rentroomsboard = this;

      LeaseModel.rentRoomsRestResource
        .getList("rooms")
        .then(function(rooms){
          rentroomsboard.AllRooms = rooms;
      });

      LeaseModel.restResource.getList().then(function(buildings){
        rentroomsboard.AllBuildings = buildings;
      });

      rentroomsboard.buildingName=""

      rentroomsboard.openSignModal = function(aRoom){
        $uibModal.open({
          templateUrl: "/view/rent/lease/signRoomModal.html",
          controller: "LeaseRoomSignModalCtrl",
          controllerAs: "leaseRoomSignModal",
          backdrop: "static",
          resolve: {
            room:aRoom
          }
        });
      }

      rentroomsboard.viewSignModal = function(aRoom){
        $uibModal.open({
          templateUrl: "/view/rent/lease/viewSignRoomModal.html",
          controller: "LeaseViewRoomSignModalCtrl",
          controllerAs: "leaseViewRoomSignModal",
          resolve: {
            room:aRoom
          }
        });
      }

      rentroomsboard.terminalSignModal = function(aRoom){
        $uibModal.open({
          templateUrl: "/view/rent/lease/terminalSignRoomModal.html",
          controller: "TerminalViewRoomSignModalCtrl",
          controllerAs: "terminalViewRoomSignModal",
          backdrop: "static",
          resolve: {
            room: function(){
              return aRoom;
            }
          }
        });
      }

      rentroomsboard.filterContractStatus = "";
      rentroomsboard.filterStatus = function(status){
        rentroomsboard.filterContractStatus = status;
      }

    });
