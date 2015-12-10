angular.module('Rent.Fee')
  .controller('FeeMetaboardCtrl',
    function($uibModal, FeeModel) {
      var feemetaboard = this;
      FeeModel.restResource.getList().then(function(feemetas){
        feemetaboard.feeMetas = feemetas
      });

      feemetaboard.openAddFeeMetaModal = function() {
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

      feemetaboard.openEditFeeMetaModal = function(feeMeta) {
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

      feemetaboard.deleteFeeMeta = function(aFeeMeta) {
          if (confirm("确定删除?")) {
            aFeeMeta.remove().then(function(){
              var index = feemetaboard.feeMetas.indexOf(aFeeMeta);
              if (index > -1) {
                feemetaboard.feeMetas.splice(index,1);
              }
            })
          }
      }
    });

angular.module('Rent.Fee')
  .controller('AddFeeMetaModalCtrl',
    function($uibModalInstance, feeMetas) {
      var addFeeMetaModal = this;
      addFeeMetaModal.newFeeMeta = {name:"",type:0, fee:0, alert:1};
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 2);

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
        feeMetas.post(addFeeMetaModal.newFeeMeta).then(function(feeMeta){
            feeMetas.push(feeMeta);
        });
        $uibModalInstance.close();
      };
    }
);


angular.module('Rent.Fee')
  .controller('EditFeeMetaModalCtrl',
    function($uibModalInstance, feeMeta) {
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
        feeMeta.name = editFeeMetaModal.newFeeMeta.name;
        feeMeta.fee = editFeeMetaModal.newFeeMeta.fee;
        feeMeta.type = editFeeMetaModal.newFeeMeta.type;
        feeMeta.alert = editFeeMetaModal.newFeeMeta.alert;
        feeMeta.fee_start_date = editFeeMetaModal.newFeeMeta.fee_start_date;
        feeMeta.fee_end_date = editFeeMetaModal.newFeeMeta.fee_end_date;
        feeMeta.fee_alert_date = editFeeMetaModal.newFeeMeta.fee_alert_date;
        feeMeta.save();
        $uibModalInstance.close();
      };
    }
);
