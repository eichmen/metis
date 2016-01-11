angular.module('Metis').directive('patientGeneralHabits', function () {
    return {
        scope: {
            patient: "="
        },
        restrict: 'E',
        templateUrl: 'client/scripts/components/patients/tabs/generalHabits.html',
        controllerAs: 'patientGeneralHabits',
        controller: function ($scope, $reactive, $stateParams, $mdDialog, $mdToast) {
            $reactive(this).attach($scope);

            this.patientId = $stateParams.patientId;

            $scope.smoker = ['No', 'Passive smoker', 'Weekend smoker','Some cigarettes at week','<1 pack per day','1 or more pack per day'];
            $scope.physicalActivity = ['Very light','Light','Moderate','Intense','Very intense'];
            $scope.pregnant = ['','Yes','No'];
            $scope.breadFeed = ['','Yes','No'];
            $scope.tired = ['','Yes','No'];
        }
    }
})
;