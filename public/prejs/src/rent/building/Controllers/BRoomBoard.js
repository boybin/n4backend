angular.module('Rent.Building')
  .controller('BRoomboardCtrl',
    function($uibModal, $stateParams, BuildingModel) {
      var roomboard = this;
      //当前的房间板块显示的数据
      BuildingModel.restResource
        .one($stateParams.building_id)
        .getList("rooms")
        .then(function(rooms){
          roomboard.AllRooms = rooms;
      });

      var building = BuildingModel.restResource
        .one($stateParams.building_id)
        .get().then(function(aBuilding){
          roomboard.building = aBuilding;
        });

      roomboard.openAddRoomModal = function() {
        $uibModal.open({
          templateUrl: "/view/rent/building/addRoomModal.html",
          controller: "RoomAddModalCtrl",
          controllerAs: "addRoomModal",
          backdrop: "static",
          resolve: {
            rooms: function(){
              return roomboard.AllRooms;
            }
          }
        });
      };

      roomboard.deleteRoom = function(aRoom) {
        if(confirm("确定删除?")) {
          aRoom.remove().then(function(){
            var index = roomboard.AllRooms.indexOf(aRoom);
            if (index > -1) {
              roomboard.AllRooms.splice(index, 1);
            }
          });
        }
      }

      roomboard.openEditRoomModal = function(aRoom) {
        $uibModal.open({
          templateUrl: "/view/rent/building/editRoomModal.html",
          controller: "RoomEditModalCtrl",
          controllerAs: "editRoomModal",
          backdrop: "static",
          resolve: {
            room:aRoom
          }
        });
      }

  });

angular.module('Rent.Building')
    .controller('RoomEditModalCtrl',
      function($uibModalInstance, $scope, room) {
        var editRoomModal = this;
        editRoomModal.room = room.clone();

        editRoomModal.cancel = function(){
          $uibModalInstance.close();
        };

        editRoomModal.save = function(){
          var editRoomForm = $scope['editRoomForm'];
          if ($scope.rentCommonUtils.validateForm($scope, editRoomForm) && confirm("修改房间?")) {
            room.name = editRoomModal.room.name;
            room.desc = editRoomModal.room.desc;
            room.water_degree = editRoomModal.room.water_degree;
            room.electric_degree = editRoomModal.room.electric_degree;
            room.save();
            $uibModalInstance.close();
          }
        };
      }
    );

angular.module('Rent.Building')
    .controller('RoomAddModalCtrl',
      function($uibModalInstance, $scope, rooms) {
        var addRoomModal = this;
        addRoomModal.newRoom = {name:"", desc:"", water_degree:0, electric_degree:0};

        addRoomModal.cancel = function(){
            $uibModalInstance.close();
        };

        addRoomModal.save = function(){
          var addRoomForm = $scope['addRoomForm'];
          if ($scope.rentCommonUtils.validateForm($scope, addRoomForm) && confirm("添加房间?")) {
            rooms.post(addRoomModal.newRoom).then(function(aRoom) {
              rooms.push(aRoom);
            });

            $uibModalInstance.close();
          }
        };
    }
  );
