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
    });
