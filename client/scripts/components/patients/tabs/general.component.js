angular.module('Metis').directive('patientGeneral', function () {
    return {
        scope: {
            patient: "="
        },
        restrict: 'E',
        templateUrl: 'client/scripts/components/patients/tabs/general.html',
        controllerAs: 'patientGeneral',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);
            $scope.genderList=['','Man','Woman'];
            $scope.children=['0','1','2','3','+3'];
            $scope.workShift=['Student','Labor inactivity','Housewife','Full-time daily','Retired','Part time'];
            $scope.workType=['Sitting','Sitting and standing','Standing','In movement','Physically demanding work'];
        }
    }
});