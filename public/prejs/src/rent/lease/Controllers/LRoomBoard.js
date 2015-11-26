angular.module('Rent.Lease')
  .controller('LRoomboardCtrl',
    function($uibModal, LeaseModel) {
      var lroomboard = this;
      //当前的房间板块显示的数据
      lroomboard.AllRooms = LeaseModel.AllRooms();
    });
