angular.module('Rent.Building')
  .controller('BuildboardCtrl',
    function($uibModal, BuildingModel) {
      var buildboard = this;
      //当前的房间板块显示的数据
      buildboard.AllBuildings = BuildingModel.AllBuildings();
    });
