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
          resolve: {
            room:aRoom
          }
        });
      }

  });

angular.module('Rent.Building')
    .controller('RoomEditModalCtrl',
      function($uibModalInstance, room) {
        var editRoomModal = this;
        editRoomModal.room = room.clone();

        editRoomModal.cancel = function(){
          $uibModalInstance.close();
        };

        editRoomModal.save = function(){
          room.name = editRoomModal.room.name;
          room.desc = editRoomModal.room.desc;
          room.save();
          $uibModalInstance.close();
        };
      }
    );

angular.module('Rent.Building')
    .controller('RoomAddModalCtrl',
      function($uibModalInstance, $scope, rooms) {
        var addRoomModal = this;
        addRoomModal.newRoom = {name:"", desc:""};

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
