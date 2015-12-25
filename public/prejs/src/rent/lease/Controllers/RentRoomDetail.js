angular.module('Rent.Lease')
  .controller('RentRoomDetailCtrl',
    function($uibModal, $scope, $stateParams, LeaseModel, store) {
      var vm = this;
      vm.contracts = [];
      LeaseModel.RoomHistoryRestResource
        .one($stateParams.room_id)
        .getList()
        .then(function(ret){
          console.log(ret);
          vm.contracts = ret;
          for(contract of vm.contracts) {
              for(image of contract.images) {
                image.thumb = image.img;
              }
          }
      });

    });
