angular.module('Metis').directive('anthropometric', function () {
    return {
        scope: {
            patient: "="
        },
        restrict: 'E',
        templateUrl: 'client/scripts/components/patients/tabs/anthropometric.html',
        controllerAs: 'anthropometric',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);

        }
    }
});