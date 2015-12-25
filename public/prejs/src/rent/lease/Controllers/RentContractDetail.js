angular.module('Rent.Lease')
  .controller('RentContractDetailCtrl',
    function($uibModal, $scope, $stateParams, LeaseModel, store) {
      var vm = this;

      vm.imageNumbers = 0;
      LeaseModel.ContractImagesRestResource
        .one($stateParams.contract_id)
        .getList()
        .then(function(ret){
        vm.images = ret;
        vm.imageNumbers = ret.length;
        for (image of vm.images) {
          image.thumb = image.img;
        }
      });

      vm.token = store.get('query_token');
      var targetUrl = '/api/images/upload/'+$stateParams.room_id+'/'+$stateParams.contract_id;

      vm.flowConfig =  {
        target:targetUrl,
        permanentErrors: [404, 500, 501, 401],
        maxChunkRetries: 1,
        chunkRetryInterval: 5000,
        simultaneousUploads: 4,
        headers:function(file, chunk, isTest){
            return {
              "Authorization": 'Bearer ' + vm.token
            }
        }
      };


      vm.maxSizeShow = false;
      vm.fileAdded = function($file, $event, $flow) {
        var ret = true;
        if ($file.size > 50000) {
          ret = false;
          vm.maxSizeShow = true;
        } else {
          vm.maxSizeShow = false;
        }

        return ret;
      }

      vm.filesMaxNumShow = false;
      vm.filesAdded = function($files, $event, $flow) {
        var ret = true;
        if($files.length>5){
          vm.filesMaxNumShow = true;
          ret = false;
        } else {
          vm.filesMaxNumShow = false;
        }
        if(ret) {
          for (var fileIdx in $files) {
            if ($files.hasOwnProperty(fileIdx)) {
              if($files[fileIdx].size>50000) {
                ret = false;
                vm.maxSizeShow = true;
                break;
              } else {
                ret = true;
                vm.maxSizeShow = false;
              }
            }
          }
        }
        return ret;
      }

      vm.failedShow = false;
      vm.successShow = false;
      vm.fileSuccess = function($file, $event, $flow) {
        vm.failedShow = false;
        vm.successShow = true;
      }
      vm.filesSuccess = function($files, $message, $flow) {
        vm.failedShow = false;
        vm.successShow = true;
      }
      vm.fileFailed = function($file, $message, $flow) {
        var files = $flow.files;
        var idx = files.indexOf($file);
        if (idx > -1) {
          files.splice(idx, 1);
        }
        vm.failedShow = true;
        vm.successShow = false;
      }

      LeaseModel.rentRoomsRestResource
        .getList("rooms")
        .then(function(rooms){
          vm.AllRooms = rooms;
      });

    });
