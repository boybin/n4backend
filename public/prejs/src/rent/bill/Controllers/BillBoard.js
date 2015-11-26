angular.module('Rent.Bill')
  .controller('BillboardCtrl',
    function($uibModal, BillModel) {
      var billboard = this;
      //当前的房间板块显示的数据
      billboard.AllBuildings = BillModel.AllBuildings();
    });
