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

      editFeeMetaModal.cancel = function(){
        $uibModalInstance.close();
      };

      editFeeMetaModal.save = function(){
        feeMeta.name = editFeeMetaModal.newFeeMeta.name;
        feeMeta.fee = editFeeMetaModal.newFeeMeta.fee;
        feeMeta.type = editFeeMetaModal.newFeeMeta.type;
        feeMeta.alert = editFeeMetaModal.newFeeMeta.alert;
        feeMeta.save();
        $uibModalInstance.close();
      };
    }
);
