angular.module('Rent.Common')
    .controller('MainCtrl',
      function ($scope, $rootScope, store, BuildingModel,$state) {
        //Tab hightlight
        var main = this;
        main.$state = $state;

        //----Fucntions for navigation-----//
        main.isBuilding = function(){
          return ($state.includes("buildingboard")
                    ||$state.includes("roomboard"));
        }
        main.isRentBoard = function(){
          return ($state.includes("rentroomsboard"));
        }
        main.isRent = function() {
          return ($state.includes("leaseboard")
                    ||$state.includes("leaseroomboard")
                    // ||$state.includes("rentroomsboard")
                  );
        }
        main.isFee = function () {
          return ($state.includes("feemetaboard")
                    ||$state.includes("feeboard")
                    ||$state.includes("feemetaplans")
                    ||$state.includes("feeroomsboard")
                    ||$state.includes("feeboard")
                    ||$state.includes("feestatisticboard")
                    ||$state.includes("feeplanboard")
                  );
        }

        main.isUserManager = function() {
          return ($state.includes("userboard"));
        }
        //---------------------------------//
    });
