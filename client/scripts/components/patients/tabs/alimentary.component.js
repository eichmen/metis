angular.module('Metis').directive('patientAlimentary', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/scripts/components/patients/tabs/alimentary.html',
        controllerAs: 'patientAlimentary',
        controller: function ($scope, $reactive, $stateParams,$mdDialog, $mdToast) {
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

            this.alimentaryHabitsConstants = [
                {
                    label: 'Breakfast',
                    key: 'breakfast'
                },
                {
                    label: 'Midmorning',
                    key: 'midmorning'
                },
                {
                    label: 'Lunch',
                    key: 'lunch'
                },
                {
                    label: 'Afternoon snack',
                    key: 'afternoon'
                },
                {
                    label: 'Dinner',
                    key: 'dinner'
                },
                {
                    label: 'Afterdinner',
                    key: 'afterdinner'
                }
            ];
            this.snackingState = ['Never','Sometimes','Yes']
            this.waterState = ['1L','1.5L','2L','2.5L',"3L",">3L"]
            this.alcoholState = ['Never','1 day per week','Every weekend','Everyday'];
            this.checkModel = function () {
                console.log(this.patient);
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