angular.module('Rent.Building')
  .controller('BuildboardCtrl',
    function($uibModal, BuildingModel) {
      var buildboard = this;
      //当前的房间板块显示的数据
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
            resolve: {
              buildings: function(){
                return buildboard.AllBuildings;
              }
            }
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
    });

    angular.module('Rent.Building')
      .controller('BuildingModalCtrl',
        function($uibModalInstance, $scope, building) {
          var buildingModal = this;
          buildingModal.building = building.clone();

          buildingModal.cancel = function(){
            $uibModalInstance.close();
          };

          buildingModal.save = function(){
            var editBuildingForm = $scope['editBuildingForm'];
            if ($scope.rentCommonUtils.validateForm($scope, editBuildingForm) && confirm("编辑楼?")) {
              building.name = buildingModal.building.name;
              building.rooms_count = buildingModal.building.rooms_count;
              building.desc = buildingModal.building.desc;
              building.save();
              $uibModalInstance.close();
            }
          };
        }
      );

    angular.module('Rent.Building')
        .controller('BuildingAddModalCtrl',
          function($uibModalInstance, $scope, buildings) {
            var buildingAddModal = this;
            buildingAddModal.newbuilding = {name:"", rooms_count:0, desc:""};

            buildingAddModal.cancel = function(){
              $uibModalInstance.close();
            };

            buildingAddModal.save = function(){
              var addBuildingForm = $scope['addBuildingForm'];
              if ($scope.rentCommonUtils.validateForm($scope, addBuildingForm) && confirm("添加楼?")) {
                buildings.post(buildingAddModal.newbuilding).then(function(building){
                  buildings.push(building);
                });

                $uibModalInstance.close();
              }
            };
          }
      );
