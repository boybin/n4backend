angular.module('Rent.Building')
  .controller('BuildboardCtrl',
    function($uibModal, BuildingModel) {
      var buildboard = this;
      //当前的房间板块显示的数据
      // buildboard.AllBuildings = BuildingModel.AllBuildings();
      // var b = BuildingModel.restResource.get(1);
      // console.log(BuildingModel.restResource);
      var allBuildings;
      BuildingModel.restResource.getList().then(function(buildings){
        buildboard.AllBuildings = buildings;
        allBuildings = buildings;
      });

      buildboard.openmodal = function(aBuilding) {
          $uibModal.open({
            templateUrl: "/view/rent/building/buildingModal.html",
            controller: "BuildingModalCtrl",
            controllerAs: "buildingModal",
            resolve: {
              building:aBuilding
            }
          });
      };

      buildboard.openAddModal = function() {
          $uibModal.open({
            templateUrl: "/view/rent/building/buildingAddModal.html",
            controller: "BuildingAddModalCtrl",
            controllerAs: "buildingAddModal",
          });
      };

      buildboard.deleteBuilding = function (aBuilding) {
        if(confirm("确定删除?")) {
          aBuilding.remove().then(function(){
            var index = buildboard.AllBuildings.indexOf(aBuilding);
            if (index > -1) {
              buildboard.AllBuildings.splice(index, 1);
            }
          });

        }
      };
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

    angular.module('Rent.Building')
      .controller('BuildingModalCtrl',
        function($uibModalInstance, building) {
          var buildingModal = this;
          buildingModal.building = building.clone();

          buildingModal.cancel = function(){
            $uibModalInstance.close();
          };

          buildingModal.save = function(){
            building.name = buildingModal.building.name;
            building.rooms_count = buildingModal.building.rooms_count;
            building.desc = buildingModal.building.desc;
            building.save();
            $uibModalInstance.close();
          };
        }
      );

    angular.module('Rent.Building')
        .controller('BuildingAddModalCtrl',
          function($uibModalInstance) {
            var buildingAddModal = this;
            buildingAddModal.newbuilding = {name:"", rooms_count:0, desc:""};

            buildingAddModal.cancel = function(){
              $uibModalInstance.close();
            };

            buildingAddModal.save = function(){
              $uibModalInstance.close();
            };
          }
      );
