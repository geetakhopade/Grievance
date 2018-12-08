//************ Global Variables Start ************//

var shortDateFormat = "dd/MM/yyyy";
var fullDateFormat = shortDateFormat + " hh:mm:ss.sss a";

//************ Global Variables End ************//

(function () {
    angular.module('GR', ['ngTable']);
})();

angular.module('GR').filter('formatedDate', formatedDate);

function formatedDate($filter) {
    return function (input, format) {
        return (input) ? $filter('date')(parseInt(input.substr(6)), format) : '';
    };
}

angular
    .module('GR')
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])
    .directive('multiFileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.multiFileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files);
                    });
                });
            }
        };
    }]);