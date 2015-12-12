angular.module('Rent.Lease')
  .controller('LRoomboardCtrl',
    function($uibModal, $stateParams, LeaseModel) {
      var leaseroomboard = this;

      LeaseModel.restResource
        .one($stateParams.building_id)
        .getList("rooms")
        .then(function(rooms){
          leaseroomboard.AllRooms = rooms;
      })

      leaseroomboard.openSignModal = function(aRoom){
        $uibModal.open({
          templateUrl: "/view/rent/lease/signRoomModal.html",
          controller: "LeaseRoomSignModalCtrl",
          controllerAs: "leaseRoomSignModal",
          resolve: {
            room:aRoom
          }
        });
      }

      leaseroomboard.viewSignModal = function(aRoom){
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

angular.module('Rent.Lease')
  .controller('LeaseRoomSignModalCtrl',
    function($uibModalInstance, room, LeaseModel) {
      var leaseRoomSignModal = this;
      leaseRoomSignModal.room = room;

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterYear = new Date();
      afterYear.setDate(tomorrow.getDate() + 365);

      leaseRoomSignModal.room.contract =
      {
        user_id:1,
        room_id:room.id,
        building_id:room.building_id,
        room_name:room.name,
        contractor_name:"",
        contractor_number:"",
        start_time:tomorrow,
        end_time:afterYear,
        id_number:"",
        phone:"",
        contractor_location:""
      };

      leaseRoomSignModal.startOpen = false;
      leaseRoomSignModal.openStartCal = function($event) {
        leaseRoomSignModal.startOpen = true;
      }
      leaseRoomSignModal.endOpen = false;
      leaseRoomSignModal.openEndCal = function($event) {
        leaseRoomSignModal.endOpen = true;
      }

      leaseRoomSignModal.cancel = function(){
        $uibModalInstance.close();
      };
      leaseRoomSignModal.save = function(){
        LeaseModel.contractRestResource.post(leaseRoomSignModal.room.contract).then(function(aContract){
          leaseRoomSignModal.room.contract = aContract;
        });
        $uibModalInstance.close();
      }
    }
  );

angular.module('Rent.Lease')
  .controller('LeaseViewRoomSignModalCtrl',
    function($uibModalInstance, room, LeaseModel) {
      var leaseViewRoomSignModal = this;
      leaseViewRoomSignModal.room = room;

      leaseViewRoomSignModal.startOpen = false;
      leaseViewRoomSignModal.openStartCal = function($event) {
        leaseViewRoomSignModal.startOpen = true;
      }
      leaseViewRoomSignModal.endOpen = false;
      leaseViewRoomSignModal.openEndCal = function($event) {
        leaseViewRoomSignModal.endOpen = true;
      }

      leaseViewRoomSignModal.cancel = function(){
        $uibModalInstance.close();
      };

      leaseViewRoomSignModal.save = function(){
        // LeaseModel.contractRestResource.post(leaseViewRoomSignModal.room.contract).then(function(aContract){
          // leaseViewRoomSignModal.room.contract = aContract;
        // });
        $uibModalInstance.close();
      }
    }
);
