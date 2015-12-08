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
      })

      roomboard.openAddRoomModal = function() {

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

      roomboard.editRoomModal = function() {

      }

    });

angular.module('Rent.Building')
    .controller('RoomModalCtrl',
      function($uibModalInstance, room) {
        var roomModal = this;
        roomModal.room = room.clone();

        roomModal.cancel = function(){
          $uibModalInstance.close();
        };

        roomModal.save = function(){
          room.name = roomModal.room.name;
          room.save();
          $uibModalInstance.close();
        };
      }
    );

angular.module('Rent.Building')
    .controller('RoomAddModalCtrl',
      function($uibModalInstance, rooms) {
        var roomModal = this;

        roomModal.cancel = function(){
        $uibModalInstance.close();
      };

      roomModal.save = function(){
        room.name = roomModal.room.name;
        room.save();
        $uibModalInstance.close();
      };
    }
  );
