angular.module('Rent.Fee')
  .controller('FeeMetaPlansCtrl',
    function($uibModal, FeeModel) {
      var feemetaplans = this;
      FeeModel.restResource.getList().then(function(feemetas){
        feemetaplans.feeMetas = feemetas
      });

      feemetaplans.openAddFeeMetaModal = function() {
        $uibModal.open({
          templateUrl: "/view/rent/fee/addFeeMetaModal.html",
          controller: "AddFeeMetaModalCtrl",
          controllerAs: "addFeeMetaModal",
          resolve: {
            feeMetas: function(){
              return feemetaboard.feeMetas;
            }
          }
        });
      }

      feemetaplans.openEditFeeMetaModal = function(feeMeta) {
        $uibModal.open({
          templateUrl: "/view/rent/fee/editFeeMetaModal.html",
          controller: "EditFeeMetaModalCtrl",
          controllerAs: "editFeeMetaModal",
          resolve: {
            feeMeta: function(){
              return feeMeta;
            }
          }
        });
      }

    });

angular.module('Rent.Fee')
  .controller('AddFeeMetaModalCtrl',
    function($uibModalInstance, $scope, feeMetas) {
      var addFeeMetaModal = this;
      addFeeMetaModal.newFeeMeta = {name:"",type:1, fee:0, alert:1};
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 365);

      addFeeMetaModal.newFeeMeta.fee_start_date = tomorrow;
      addFeeMetaModal.newFeeMeta.fee_end_date = afterTomorrow;
      addFeeMetaModal.newFeeMeta.fee_alert_date = afterTomorrow;

      addFeeMetaModal.minDate = new Date();
      addFeeMetaModal.maxDate = new Date(2020, 5, 22);

      addFeeMetaModal.startOpen = false;
      addFeeMetaModal.openStartCal = function($event) {
        addFeeMetaModal.startOpen = true;
      }
      addFeeMetaModal.endOpen = false;
      addFeeMetaModal.openEndCal = function($event) {
        addFeeMetaModal.endOpen = true;
      }
      addFeeMetaModal.alertOpen = false;
      addFeeMetaModal.openAlertCal = function($event) {
        addFeeMetaModal.alertOpen = true;
      }

      addFeeMetaModal.cancel = function(){
        $uibModalInstance.close();
      };

      addFeeMetaModal.save = function(){
        var addFeeMetaForm = $scope['addFeeMetaForm'];
        if ($scope.rentCommonUtils.validateForm($scope, addFeeMetaForm) && confirm("确定添加该费用?")) {
          feeMetas.post(addFeeMetaModal.newFeeMeta).then(function(feeMeta){
              feeMetas.push(feeMeta);
          });
          $uibModalInstance.close();
        }
      };
    }
);


angular.module('Rent.Fee')
  .controller('EditFeeMetaModalCtrl',
    function($uibModalInstance, $scope, feeMeta) {
      var editFeeMetaModal = this;
      editFeeMetaModal.newFeeMeta = feeMeta.clone();

      editFeeMetaModal.minDate = new Date();
      editFeeMetaModal.maxDate = new Date(2020, 5, 22);

      editFeeMetaModal.startOpen = false;
      editFeeMetaModal.openStartCal = function($event) {
        editFeeMetaModal.startOpen = true;
      }
      editFeeMetaModal.endOpen = false;
      editFeeMetaModal.openEndCal = function($event) {
        editFeeMetaModal.endOpen = true;
      }
      editFeeMetaModal.alertOpen = false;
      editFeeMetaModal.openAlertCal = function($event) {
        editFeeMetaModal.alertOpen = true;
      }

      editFeeMetaModal.cancel = function(){
        $uibModalInstance.close();
      };

      editFeeMetaModal.save = function(){
        var editFeeMetaForm = $scope['editFeeMetaForm'];
        if (confirm("确认修改费用信息")) {
          feeMeta.name = editFeeMetaModal.newFeeMeta.name;
          feeMeta.fee = editFeeMetaModal.newFeeMeta.fee;
          feeMeta.type = editFeeMetaModal.newFeeMeta.type;
          feeMeta.alert = editFeeMetaModal.newFeeMeta.alert;
          feeMeta.fee_start_date = editFeeMetaModal.newFeeMeta.fee_start_date;
          feeMeta.fee_end_date = editFeeMetaModal.newFeeMeta.fee_end_date;
          feeMeta.fee_alert_date = editFeeMetaModal.newFeeMeta.fee_alert_date;
          feeMeta.save();

          $uibModalInstance.close();
        }
      };
    }
);
