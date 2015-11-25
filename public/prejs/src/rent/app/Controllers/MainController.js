angular.module('Rent.Common')
    .controller('MainCtrl',
      function ($scope, $rootScope, $route, store, BuildingModel) {
        //Tab hightlight
        $scope.$route = $route;
        var main = this;
        main.AllRoomsStatus = BuildingModel.AllBuildings();

/*        RoomModel.AllRoomsStatus()
                .then(function (allRoomStatus) {
                  main.allRoomStatus = allRoomStatus;
                });
                */
    });
