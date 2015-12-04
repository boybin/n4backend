angular.module('Rent.Building')
  .controller('BuildboardCtrl',
    function($uibModal, BuildingModel) {
      var buildboard = this;
      //当前的房间板块显示的数据
      // buildboard.AllBuildings = BuildingModel.AllBuildings();
      // var b = BuildingModel.restResource.get(1);
      // console.log(BuildingModel.restResource);
      BuildingModel.restResource.getList().then(function(buildings){
        buildboard.AllBuildings = buildings;
      })
/*
      var test = BuildingModel.restResource.one(1).get().then(function(aa){
          console.log(aa);
      });
      console.log(test);

      BuildingModel.restResource.post({user_id:"4",name:"思思号楼",desc:"测试测试",rooms_count:44}).then(function(bb){
          console.log(bb);
      });
      */

    });
