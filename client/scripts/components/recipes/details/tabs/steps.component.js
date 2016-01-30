angular.module('Metis').directive('recipeSteps', function () {
    return {
        scope: {},
        bindToController: {
            steps: "=steps",
            readOnlyMode: "=readOnlyMode"
        },
        restrict: 'E',
        templateUrl: 'client/scripts/components/recipes/details/tabs/steps.html',
        controllerAs: 'vm',
        controller: function ($scope, $reactive) {
            let vm = this;
            $reactive(vm).attach($scope);

            vm.deleteStep = deleteStep;
            vm.addStep = addStep;

            function deleteStep(stepNumber) {
                vm.steps =
                    vm.steps.filter(function (el) {
                        return el.number !== stepNumber;
                    })
            };

            function addStep() {
                let max = 1;
                if(!_.isEmpty(vm.steps)) {
                    max = _.max(vm.steps, function(step) {
                        return step.number;
                    }).number;
                }

                vm.steps.push({
                    number: max+1,
                    desc: ''
                })
            };
        }
    }
});