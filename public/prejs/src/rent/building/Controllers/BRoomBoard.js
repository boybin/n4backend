angular.module('Rent.Building')
  .controller('BRoomboardCtrl',
    function($uibModal, $stateParams, BuildingModel) {
      var roomboard = this;
      //当前的房间板块显示的数据
      // broomboard.AllRooms = BuildingModel.AllRooms();

      BuildingModel.restResource
        .one($stateParams.building_id)
        .getList("rooms")
        .then(function(rooms){
          roomboard.AllRooms = rooms;
      })
      // console.log($scope.building_id);
      /*
      console.log($stateParams);
      console.log($stateParams.building_id);
      */
    });
