angular.module('Metis').directive('ingredient', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/scripts/components/ingredients/details/ingredientDetails.html',
        controllerAs: 'vm',
        controller: function ($scope, $stateParams, $reactive, translatorService) {
            let vm = this;
            $reactive(vm).attach($scope);

            vm.ingredientId = $stateParams.ingredientId;
            vm.currentLanguage = translatorService.getLanguage();

            vm.helpers({
                ingredient: () => {
                    return Ingredients.findOne(vm.getReactively('ingredientId'));
                },
                types: () => {
                    return [
                        {
                            value: vm.getReactively('ingredient.proximates'),
                            label: 'Proximates'
                        },
                        {
                            value: vm.getReactively('ingredient.minerals'),
                            label: 'Minerals'
                        },
                        {
                            value: vm.getReactively('ingredient.vitamins'),
                            label: 'Vitamins'
                        },
                        {
                            value: vm.getReactively('ingredient.lipids'),
                            label: 'Lipids'
                        }
                    ];
                }
            });

            vm.subscribe('ingredient-details', () => {
                return [vm.getReactively('ingredientId')];
            });
        }
    }
});