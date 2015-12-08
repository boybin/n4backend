angular.module('Rent.Common')
    .controller('MainCtrl',
      function ($scope, $rootScope, store, BuildingModel,$state) {
        //Tab hightlight
        var main = this;

        //----Fucntions for navigation-----//
        main.isBuilding = function(){
          return ($state.includes("buildingboard")
                    ||$state.includes("roomboard"));
        }
        main.isRentBoard = function(){
          return ($state.includes("rent"));
        }
        main.isRent = function() {
          return false;
        }
        main.isFee = function () {
          return false;
        }
        //---------------------------------//

        main.AllRoomsStatus = BuildingModel.AllBuildings();

/*        RoomModel.AllRoomsStatus()
                .then(function (allRoomStatus) {
                  main.allRoomStatus = allRoomStatus;
                });
                */
    });
