angular.module('Metis').directive('patientTabs', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/scripts/components/patients/patientTabs.html',
        controllerAs: 'patientTabs',
        controller: function ($scope, $reactive,$stateParams,$mdToast) {
            $reactive(this).attach($scope);

            this.patientId = $stateParams.patientId;
            console.log(this.patientId);

            this.subscribe('patient-details', () => {
                return [this.getReactively('patientId')];
            });

            this.helpers({
                patient: () => {
                    return Patients.findOne(this.getReactively('patientId'));
                }

            });

            this.save = save;

            function save() {
                Meteor.call('updatePatientGeneral', this.patient, Meteor.userId(), function (error, result) {
                    if (error) {
                        console.log('failed', err);
                    } else {
                        console.log('success updatePatientGeneral');
                        toast('General information updated');
                    }
                });
            }
            function toast(message) {
                $mdToast.show(
                    $mdToast.simple()
                        .content(message)
                        .hideDelay(3000)
                );

            }

        }
    }
});