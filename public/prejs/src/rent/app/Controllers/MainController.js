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
          return ($state.includes("leaseboard")
                    ||$state.includes("leaseroomboard"));
        }
        main.isFee = function () {
          return ($state.includes("feemetaboard")
                    ||$state.includes("feeboard"));
        }
        //---------------------------------//

        main.AllRoomsStatus = BuildingModel.AllBuildings();

    });
