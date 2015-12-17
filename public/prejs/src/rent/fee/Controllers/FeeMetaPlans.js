angular.module('Rent.Fee')
  .controller('FeeMetaPlansCtrl',
    function($uibModal, FeeModel) {
      var feemetaplans = this;
      FeeModel.restResource.getList().then(function(feemetas){
        feemetaplans.feeMetas = feemetas
      });

      feemetaplans.openCollectFeeMetaModal = function(feeMeta, assign_type) {
        var view = "/view/rent/fee/collectFeeMetaModal" + "-" + assign_type +"-"+ feeMeta.type + ".html";
        feeMeta.assign_type = assign_type;

        if (feeMeta.type == 1) {
          feeMeta.days = 100;
        } else if(feeMeta.type == 2) {
          feeMeta.days = 30;
        } else if(feeMeta.type == 3) {
          feeMeta.days = 15;
        }

        $uibModal.open({
          templateUrl: view,
          controller: "CollectFeeMetaModalCtrl",
          controllerAs: "collectFeeMetaModal",
          resolve: {
            feeMeta: function(){
              return feeMeta;
            }
          }
        });
      }

    });

angular.module('Rent.Fee')
  .controller('CollectFeeMetaModalCtrl',
    function($uibModalInstance, $scope, FeeModel, LeaseModel, feeMeta) {
      var collectFeeMetaModal = this;
      collectFeeMetaModal.newFeeMeta = feeMeta.clone();

      if(feeMeta.assign_type == 2) {
        LeaseModel.restResource.getList().then(function(buildings){
          collectFeeMetaModal.AllBuildings = buildings;
          if (buildings.length > 0) {
            collectFeeMetaModal.selectedBuilding = buildings[0];
          }
        });
      }

      collectFeeMetaModal.minDate = new Date();
      collectFeeMetaModal.maxDate = new Date(2020, 5, 22);

      collectFeeMetaModal.startOpen = false;
      collectFeeMetaModal.openStartCal = function($event) {
        collectFeeMetaModal.startOpen = true;
      }
      collectFeeMetaModal.endOpen = false;
      collectFeeMetaModal.openEndCal = function($event) {
        collectFeeMetaModal.endOpen = true;
      }
      collectFeeMetaModal.alertOpen = false;
      collectFeeMetaModal.openAlertCal = function($event) {
        collectFeeMetaModal.alertOpen = true;
      }

      collectFeeMetaModal.cancel = function(){
        $uibModalInstance.close();
      };

      collectFeeMetaModal.save = function(){

        var collectFeeMetaForm = $scope['collectFeeMetaForm'];
        if (confirm("确认修改费用信息")) {
          feeMeta.name = collectFeeMetaModal.newFeeMeta.name;
          feeMeta.fee = collectFeeMetaModal.newFeeMeta.fee;
          feeMeta.type = collectFeeMetaModal.newFeeMeta.type;
          feeMeta.days = collectFeeMetaModal.newFeeMeta.days;
          feeMeta.fee_start_date = collectFeeMetaModal.newFeeMeta.fee_start_date;

          if(feeMeta.type == 2) {
            var endDate = new Date(collectFeeMetaModal.newFeeMeta.fee_start_date);
            endDate.setMonth(endDate.getMonth() + 3);
            feeMeta.fee_end_date = endDate;
            var alertDate = new Date(collectFeeMetaModal.newFeeMeta.fee_start_date);
            alertDate.setDate(alertDate.getDate() + feeMeta.days);
            feeMeta.fee_alert_date = alertDate;
          } else if(feeMeta.type == 3) {
            var endDate = new Date(collectFeeMetaModal.newFeeMeta.fee_start_date);
            endDate.setMonth(endDate.getMonth() + 1);
            feeMeta.fee_end_date = endDate;
            var alertDate = new Date(collectFeeMetaModal.newFeeMeta.fee_start_date);
            alertDate.setDate(alertDate.getDate() + feeMeta.days);
            feeMeta.fee_alert_date = alertDate;
          }

          if(feeMeta.assign_type == 2) {
            feeMeta.building_id = collectFeeMetaModal.selectedBuilding.id;
          }
          // feeMeta.fee_end_date = collectFeeMetaModal.newFeeMeta.fee_end_date;
          // feeMeta.fee_alert_date = collectFeeMetaModal.newFeeMeta.fee_alert_date;

          FeeModel.feeMetaPlanRestResource.post(feeMeta).then(function(ret){
              if(ret['status']) {
                alert("发布成功");
              } else {
                alert("发布失败");
              }
          });

          $uibModalInstance.close();
        }
      };
    }
);
