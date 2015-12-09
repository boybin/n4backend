angular.module('Rent.Fee')
  .controller('BiRoomboardCtrl',
    function($uibModal, BuildingModel) {
      var biroomboard = this;
      //当前的房间板块显示的数据
      biroomboard.AllRooms = BuildingModel.AllRooms();
    });
