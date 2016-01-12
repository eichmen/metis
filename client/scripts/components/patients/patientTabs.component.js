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
                    if (this.patientId) {
                        return Patients.findOne(this.getReactively('patientId'));
                    } else {
                        return {};
                    }

                }

            });

            if (!this.patientId) {
                this.patient.photo = 'resources/default-avatar.png';
            }

            this.save = save;
            this.check = check;
            this.disabled = disabled;

            function check() {
                console.log(this.patient);
            }

            function save() {
                Meteor.call('updatePatientGeneral', this.patient, Meteor.userId(), function (error, result) {
                    if (error) {
                        console.log('failed', error);
                    } else {
                        console.log('success updatePatientGeneral');
                        toast('General information updated');
                    }
                });
            }

            function disabled() {
                if (this.patient && this.patient.name && this.patient.lastname) {
                    return false;
                } else {
                    return true;
                }
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