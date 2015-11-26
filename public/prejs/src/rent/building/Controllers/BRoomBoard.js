angular.module('Rent.Building')
  .controller('BRoomboardCtrl',
    function($uibModal, BuildingModel) {
      var broomboard = this;
      //当前的房间板块显示的数据
      broomboard.AllRooms = BuildingModel.AllRooms();
    });
