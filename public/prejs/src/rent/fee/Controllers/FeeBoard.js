angular.module('Rent.Fee')
  .controller('FeeboardCtrl',
    function($uibModal, FeeModel, LeaseModel) {
      var feeboard = this;
      //当前的房间板块显示的数据
      FeeModel.feePlanRoomsRestResource
        .getList()
        .then(function(rooms){
          feeboard.AllRooms = rooms;
      });

      LeaseModel.restResource.getList().then(function(buildings){
        feeboard.AllBuildings = buildings;
      });

      feeboard.buildingName=""

      feeboard.openPayFeeModal = function(aRoom){
        $uibModal.open({
          templateUrl: "/view/rent/fee/payFeeRoomModal.html",
          controller: "PayFeeRoomModalCtrl",
          controllerAs: "payFeeRoomModal",
          resolve: {
            room:aRoom
          }
        });
      }
    });


    angular.module('Rent.Fee')
      .controller('PayFeeRoomModalCtrl',
        function($uibModalInstance, $scope, room, LeaseModel, FeeModel) {
          var payFeeRoomModal = this;
          payFeeRoomModal.room = room;

          for(var plan in payFeeRoomModal.room.feeplans) {
            var feeplan = payFeeRoomModal.room.feeplans[plan];
            if(feeplan.status == 0) {
              payFeeRoomModal.selectedFeePlan = feeplan;
              break;
            }
          }
          payFeeRoomModal.payor = payFeeRoomModal.room.contract.contractor_name;

          payFeeRoomModal.payFee = function(){
            var payFeeRoomModalForm = $scope['payFeeRoomModalForm'];
            var newFeeRecord = {
              fee_plan_id:payFeeRoomModal.selectedFeePlan.id,
              rent_id:payFeeRoomModal.room.contract.id,
              building_id:payFeeRoomModal.room.building_id,
              room_id:payFeeRoomModal.room.id,
              feemeta_id:payFeeRoomModal.selectedFeePlan.feemeta_id,
              fee_name:payFeeRoomModal.selectedFeePlan.fee_name,
              payor:payFeeRoomModal.payor,
              inc_fee:payFeeRoomModal.inc_fee,
              note:payFeeRoomModal.note
            };

            if ($scope.rentCommonUtils.validateForm($scope, payFeeRoomModalForm) && confirm("确定缴费?")) {
              FeeModel.feeRecordRestResource.post(newFeeRecord).then(function(feeRecord){
                payFeeRoomModal.selectedFeePlan.current_total_fee += feeRecord.inc_fee;
                if (payFeeRoomModal.selectedFeePlan.current_total_fee>=payFeeRoomModal.selectedFeePlan.fee) {
                  payFeeRoomModal.selectedFeePlan.status = 1;
                }
                alert("缴费成功!");
                $uibModalInstance.close();
              },function(){
                alert("缴费失败!");
              });
            }

          };


          payFeeRoomModal.terminalAll = function() {
            FeeModel.terminalcontractplansRestResource.one(payFeeRoomModal.room.contract.id).remove().then(function(ret){
              if(ret['status'] == 1){
                  alert('终止所有费用成功! 您可以终止合同了');
                  $uibModalInstance.close();
              }
            },function(ret){
                alert('终止失败');
            })
          }

          payFeeRoomModal.cancel = function(){
            $uibModalInstance.close();
          };
        });
