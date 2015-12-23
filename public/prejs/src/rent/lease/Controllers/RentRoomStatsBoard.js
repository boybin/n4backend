angular.module('Rent.Lease')
  .controller('RentRoomStatsboardCtrl',
    function($uibModal, $stateParams, LeaseModel, NgTableParams, Blob, FileSaver) {
      var vm = this;
      vm.AllRooms = [];

      LeaseModel.rentRoomsRestResource
        .getList("rooms")
        .then(function(rooms){
          vm.AllRooms = rooms;
          vm.tableParams.total(vm.AllRooms.length);
          vm.tableParams.reload();

      });

      LeaseModel.restResource.getList().then(function(buildings){
        vm.AllBuildings = buildings;
      });

      vm.buildingName=""
      vm.filterContractStatus = "";
      vm.filterStatus = function(status){
        vm.filterContractStatus = status;
      }

      vm.tableParams =  new NgTableParams({
          page: 1,            // show first page
          count: 10           // count per page
      }, {
          total: vm.AllRooms.length, // length of data
          counts: [10, 25, 50, 100, 200, 1000],
          getData: function($defer, params) {
              $defer.resolve(vm.AllRooms.slice((params.page() - 1) * params.count(), params.page() * params.count()));
          }
      });

      vm.export = function() {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        FileSaver.saveAs(blob, "roomsRecords.xls");
      };

    });
