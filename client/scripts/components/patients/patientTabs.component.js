angular.module('Metis').directive('patientTabs', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/scripts/components/patients/patientTabs.html',
        controllerAs: 'patientTabs',
        controller: function ($scope, $reactive,$stateParams) {
            $reactive(this).attach($scope);

            this.patientId = $stateParams.patientId;

            this.subscribe('patient-details', () => {
                return [this.getReactively('patientId')];
            });

            this.helpers({
                patient: () => {
                    return Patients.findOne(this.getReactively('patientId'));
                }
            });
        }
    }
});