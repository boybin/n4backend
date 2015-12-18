angular.module('Rent.Fee')
  .controller('FeeStatisticboardCtrl',
    function($uibModal, FeeModel) {
      var feestatisticboard = this;

      var today = new Date();
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      feestatisticboard.start_date = today;
      feestatisticboard.end_date = tomorrow;


      feestatisticboard.startOpen = false;
      feestatisticboard.endOpen = false;

      feestatisticboard.openStartCal = function($event) {
        feestatisticboard.startOpen = true;
      }
      feestatisticboard.openEndCal = function($event) {
        feestatisticboard.endOpen = true;
      }



      feestatisticboard.search = function() {
        if (feestatisticboard.end_date.getTime() < feestatisticboard.start_date.getTime()) {
            alert("开始时间不能大于结束时间!");
            return;
        } else {
          var startdateStrToSend = feestatisticboard.start_date.getFullYear() + '-' + (feestatisticboard.start_date.getMonth() + 1) +  '-' + feestatisticboard.start_date.getDate();
          var enddateStrToSend = feestatisticboard.end_date.getFullYear() + '-' + (feestatisticboard.end_date.getMonth() + 1) +  '-' + feestatisticboard.end_date.getDate();
          FeeModel.feeRecordStaticsRestResource.post({start_date:startdateStrToSend,end_date:enddateStrToSend}).then(function(ret) {
            feestatisticboard.totalIncomes = ret;
          })
        }
      }
    });
