angular.module('Metis').directive('consumptionFrequency', function () {
    return {
        scope: {
            patient: "="
        },
        restrict: 'E',
        bindToController: true,
        templateUrl: 'client/scripts/components/patients/tabs/consumption.frecuency.html',
        controllerAs: 'consumptionFrequency',
        controller: function ($scope, $reactive, $stateParams) {
            $reactive(this).attach($scope);

            this.patientId = $stateParams.patientId;

            this.aliments = [
                {
                    label: 'Milk',
                    key: 'milk',
                    comment: ''
                },
                {
                    label: 'Yogurt',
                    key: 'yogurt',
                    comment: ''
                },
                {
                    label: 'Chocolate',
                    key: 'chocolate',
                    comment: 'Chocolate bar, Kit Kat, Mars'
                },
                {
                    label: 'Cereals',
                    key: 'cereals',
                    comment: 'Corn Flakes, Kellogs'
                },
                {
                    label: 'Biscuits (Maria)',
                    key: 'biscuits',
                    comment: ''
                },
                {
                    label: 'Chocolate Biscuits',
                    key: 'biscuits',
                    comment: 'Chocolate, cream'
                },
                {
                    label: 'Cupcakes',
                    key: 'cupcakes',
                    comment: 'Sponge cake'
                },
                {
                    label: 'Donuts',
                    key: 'donuts',
                    comment: 'Donuts, croissants'
                },
                {

                }
            ];
            this.frecuency = ['Once','Twice','Three Times', 'Four times', 'Five times', 'Everyday'];

            this.print = print;

            function print() {
                console.log(this.patient);
            }
         }
    }
});