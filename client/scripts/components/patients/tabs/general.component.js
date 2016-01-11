angular.module('Metis').directive('patientGeneral', function () {
    return {
        scope: {
            patient: "="
        },
        restrict: 'E',
        templateUrl: 'client/scripts/components/patients/tabs/general.html',
        controllerAs: 'patientGeneral',
        controller: function ($scope, $reactive, $stateParams,$mdDialog, $mdToast) {
            $reactive(this).attach($scope);

            $scope.genderList=['','Man','Woman'];

            this.update = update;

            function update() {

                Meteor.call('updatePatientGeneral', this.patient, Meteor.userId(), function (error, result) {
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
});