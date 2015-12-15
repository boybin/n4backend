angular.module('Rent.Common')
    .service('CommonUtilService',
        function () {
            var service = this;

            service.validateForm = function($scope, form) {
              $scope.$broadcast('$validate')
              if (form.$invalid) {
                form.$dirty = true;
                for (var i in form) {
                  if (form[i] && form[i].hasOwnProperty) {
                    if (form[i].hasOwnProperty('$dirty')) {
                      form[i].$dirty = true;
                    }
                    if (form[i].hasOwnProperty('$touched')) {
                      form[i].$touched = true;
                    }
                  }
                }
                return false;
              } else {
                return true
              }
            }

      });
