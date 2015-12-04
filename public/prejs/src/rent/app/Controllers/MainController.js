angular.module('Rent.Common')
    .controller('MainCtrl',
      function ($scope, $rootScope, store, BuildingModel) {
        //Tab hightlight
        var main = this;
        main.AllRoomsStatus = BuildingModel.AllBuildings();

/*        RoomModel.AllRoomsStatus()
                .then(function (allRoomStatus) {
                  main.allRoomStatus = allRoomStatus;
                });
                */
    });
