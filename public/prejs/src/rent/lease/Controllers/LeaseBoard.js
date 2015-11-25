angular.module('Rent.Lease')
  .controller('RentboardCtrl',
    function($uibModal, BuildingModel) {
      var rentboard = this;
      //当前的房间板块显示的数据
      rentboard.AllBuildings = BuildingModel.AllBuildings();

      console.log("yesyes");

    });
