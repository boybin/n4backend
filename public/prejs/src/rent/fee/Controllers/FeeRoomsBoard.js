angular.module('Rent.Fee')
  .controller('FeeRoomsboardCtrl',
    function($uibModal, $stateParams, LeaseModel) {
      var feeroomsboard = this;

      LeaseModel.ContractRoomsRestResource
        .getList()
        .then(function(rooms){
          feeroomsboard.AllRooms = rooms;
      });

      LeaseModel.restResource.getList().then(function(buildings){
        feeroomsboard.AllBuildings = buildings;
      });

      feeroomsboard.buildingName=""

      feeroomsboard.openSignModal = function(aRoom){
        $uibModal.open({
          templateUrl: "/view/rent/fee/assignFeeRoomModal.html",
          controller: "AssignFeeRoomModalCtrl",
          controllerAs: "assignFeeRoomModal",
          resolve: {
            room:aRoom
          }
        });
      }
    });

    angular.module('Rent.Fee')
      .controller('AssignFeeRoomModalCtrl',
        function($uibModalInstance, room, LeaseModel, FeeModel) {
          var assignFeeRoomModal = this;
          assignFeeRoomModal.room = room;

          FeeModel.restResource.getList().then(function(feemetas){
            assignFeeRoomModal.AllFeeMetas = feemetas;
            if (feemetas.length > 0) {
              assignFeeRoomModal.selectedFeeMeta = feemetas[0];
            }
          });

          assignFeeRoomModal.fee_start_date = new Date(room.contract.start_time);
          assignFeeRoomModal.fee_alert_date = new Date(room.contract.start_time);

          assignFeeRoomModal.startOpen = false;
          assignFeeRoomModal.openStartCal = function($event) {
            assignFeeRoomModal.startOpen = true;
          }
          assignFeeRoomModal.alertOpen = false;
          assignFeeRoomModal.openAlertCal = function($event) {
            assignFeeRoomModal.alertOpen = true;
          }

          assignFeeRoomModal.cancel = function(){
            $uibModalInstance.close();
          };
          assignFeeRoomModal.assignFee = function(){
            var valid = true;
            var fee_selected_start_date = new Date(assignFeeRoomModal.fee_start_date);
            var fee_selected_alert_date = new Date(assignFeeRoomModal.fee_alert_date);

            for (var plan in room.feeplans) {
              var feeplan = room.feeplans[plan];
              var feePlanStartDate = new Date(feeplan.fee_end_date);
              if (feeplan.feemeta_id == assignFeeRoomModal.selectedFeeMeta.id
                    && feePlanStartDate.getTime() > fee_selected_start_date.getTime()) {
                      alert(assignFeeRoomModal.selectedFeeMeta.name + "已经在" + feeplan.fee_start_date + "~" + feeplan.fee_end_date + "时间段征收过了!");
                      valid = false;
                      return;
              }
            }

            if(valid) {
              var fee_end_date;
              if (assignFeeRoomModal.selectedFeeMeta.type == 1) {
                assignFeeRoomModal.fee_start_date = room.contract.start_time;
                fee_selected_start_date = new Date(assignFeeRoomModal.fee_start_date);
                fee_end_date = room.contract.end_time;
              } else if(assignFeeRoomModal.selectedFeeMeta.type == 2) {
                var endDate = new Date(assignFeeRoomModal.fee_start_date);
                endDate.setMonth(endDate.getMonth() + 3);
                fee_end_date = endDate;
              } else if(assignFeeRoomModal.selectedFeeMeta.type == 3) {
                var endDate = new Date(assignFeeRoomModal.fee_start_date);
                endDate.setMonth(endDate.getMonth() + 1);
                fee_end_date = endDate;
              }

              if (fee_selected_alert_date.getTime() < fee_selected_start_date.getTime()) {
                  alert("预警日期不能早于费用开始日期, 注意年度类型的费用是按照合同开始的日期!");
                  return;
              }

              var newFeePlan = {
                rent_id:room.contract.id,
                feemeta_id:assignFeeRoomModal.selectedFeeMeta.id,
                room_id:room.id,
                building_id:room.building_id,
                fee_name:assignFeeRoomModal.selectedFeeMeta.name,
                fee:assignFeeRoomModal.selectedFeeMeta.fee,
                fee_start_date:assignFeeRoomModal.fee_start_date,
                fee_end_date:fee_end_date,
                fee_alert_date:assignFeeRoomModal.fee_alert_date,
                type:assignFeeRoomModal.selectedFeeMeta.type
              };

              FeeModel.contractFeePlanRestResource.post(newFeePlan).then(function(v_feeplan){
                room.feeplans.push(v_feeplan);
                alert("派发成功");
                $uibModalInstance.close();
              },function(){
                alert("选择错误,派发失败!");
              });
            }
          }

        });
