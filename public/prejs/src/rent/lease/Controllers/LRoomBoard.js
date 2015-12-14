angular.module('Rent.Lease')
  .controller('LRoomboardCtrl',
    function($uibModal, $stateParams, LeaseModel) {
      var leaseroomboard = this;

      LeaseModel.restResource
        .one($stateParams.building_id)
        .getList("rooms")
        .then(function(rooms){
          leaseroomboard.AllRooms = rooms;
      });

      LeaseModel.restResource
        .one($stateParams.building_id)
        .get()
        .then(function(aBuilding){
          leaseroomboard.building = aBuilding;
        })

      leaseroomboard.openSignModal = function(aRoom){
        $uibModal.open({
          templateUrl: "/view/rent/lease/signRoomModal.html",
          controller: "LeaseRoomSignModalCtrl",
          controllerAs: "leaseRoomSignModal",
          resolve: {
            room: function(){
              aRoom['building'] = leaseroomboard.building;
              return aRoom;
            }
          }
        });
      }

      leaseroomboard.viewSignModal = function(aRoom){
        $uibModal.open({
          templateUrl: "/view/rent/lease/viewSignRoomModal.html",
          controller: "LeaseViewRoomSignModalCtrl",
          controllerAs: "leaseViewRoomSignModal",
          resolve: {
            room: function(){
              aRoom['building'] = leaseroomboard.building;
              return aRoom;
            }
          }
        });
      }

      leaseroomboard.filterContractStatus = "";
      leaseroomboard.filterStatus = function(status){
        leaseroomboard.filterContractStatus = status;
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
        if(confirm("确定租户信息?")) {
            LeaseModel.contractRestResource.post(leaseRoomSignModal.room.contract).then(function(aContract){
            leaseRoomSignModal.room['contract'] = aContract;
            leaseRoomSignModal.room['hasContract'] = 1;
          });
        }

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
      leaseViewRoomSignModal.removeContract = function(){
        if(confirm("终止该租户合同? 此操作不可回滚")) {
          LeaseModel.contractRestResource.one(room.contract['id']).remove().then(function(){
            room['hasContract'] = 0;
            delete room['contract'];
          });
        }

        $uibModalInstance.close();
      }

    }
);
