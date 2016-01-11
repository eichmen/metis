angular.module('Metis').directive('patientAlimentary', function () {
    return {
        scope: {
            patient: "="
        },
        restrict: 'E',
        templateUrl: 'client/scripts/components/patients/tabs/alimentary.html',
        controllerAs: 'patientAlimentary',
        controller: function ($scope, $reactive, $stateParams) {
            $reactive(this).attach($scope);

            this.patientId = $stateParams.patientId;

            $scope.alimentaryHabitsConstants = [
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
            $scope.snackingState = ['Never','Sometimes','Yes']
            $scope.waterState = ['1L','1.5L','2L','2.5L',"3L",">3L"]
            $scope.alcoholState = ['Never','1 day per week','Every weekend','Everyday'];

        }
    }
});