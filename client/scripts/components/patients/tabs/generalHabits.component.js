angular.module('Metis').directive('patientGeneralHabits', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/scripts/components/patients/tabs/generalHabits.html',
        controllerAs: 'patientGeneralHabits',
        controller: function ($scope, $reactive, $stateParams, $mdDialog, $mdToast) {
            $reactive(this).attach($scope);

            this.patientId = $stateParams.patientId;

            this.subscribe('patient-details', () => {
                    return [this.getReactively('patientId')];
                }
            )
            ;

            this.helpers({
                    patient: () => {
                        return Patients.findOne(this.getReactively('patientId'));
                    }
                }
            )
            ;

            $scope.smoker = ['No', 'Passive smoker', 'Weekend smoker','Some cigarettes at week','<1 pack per day','1 or more pack per day'];
            $scope.physicalActivity = ['Very light','Light','Moderate','Intense','Very intense'];
            $scope.pregnant = ['','Yes','No'];
            $scope.breadFeed = ['','Yes','No'];
            $scope.tired = ['','Yes','No'];
            this.update = update;

            function update() {

                Meteor.call('updatePatientGeneralHabits', this.patient, Meteor.userId(), function (error, result) {
                    if (error) {
                        console.log('failed', err);
                    } else {
                        console.log('success updatePatientGeneral');
                        toast('General information updated');
                    }
                });

            }

            function showAlert(title, text) {
                alert = $mdDialog.alert({
                    title: title,
                    content: text,
                    ok: 'Close'
                });
                $mdDialog
                    .show(alert)
                    .finally(function () {
                        alert = undefined;
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
})
;