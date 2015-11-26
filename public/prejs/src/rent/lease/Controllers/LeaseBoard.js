angular.module('Rent.Lease')
  .controller('RentboardCtrl',
    function($uibModal, LeaseModel) {
      var rentboard = this;
      //当前的房间板块显示的数据
      rentboard.AllBuildings = LeaseModel.AllBuildings();
      rentboard.test = "aaa";
    });
