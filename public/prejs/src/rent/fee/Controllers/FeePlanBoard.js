angular.module('Rent.Fee')
  .controller('FeePlanboardCtrl',
    function($uibModal, FeeModel, Blob, FileSaver) {
      var feeplanboard = this;

      FeeModel.feePlanSearchRestResource.post({status:0}).then(function(plans){
        feeplanboard.feeplans = plans;
      });

      feeplanboard.export = function() {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        FileSaver.saveAs(blob, "arrearage.xls");
      };

    });
