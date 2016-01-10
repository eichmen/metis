angular.module('Metis').directive('recipe', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/scripts/components/recipes/details/recipeDetails.html',
        controllerAs: 'vm',
        controller: function ($scope, $meteor, $state, $reactive, $stateParams, ingredientsService, translatorService, unitsService) {
            let vm = this;
            $reactive(vm).attach($scope);

            vm.recipeId = $stateParams.recipeId;

            //This is rather static, so we don´t go to database for it.
            vm.foodGroups = ingredientsService.FOOD_GROUPS;

            vm.currentLanguage = translatorService.getLanguage();

            vm.readOnlyMode = !$stateParams.creation || false;

            vm.units = unitsService.UNITS;

            vm.deleteIngredient = deleteIngredient;
            vm.deleteStep = deleteStep;
            vm.addStep = addStep;

            vm.subscribe('recipe-details', () => {
                return [vm.getReactively('recipeId')];
            });

            vm.helpers({
                recipe: () => {
                    return (Recipes.findOne(this.getReactively('recipeId')) || {});
                }
            });

            function deleteIngredient(ingredientId) {
                vm.recipe.ingredients = vm.recipe.ingredients.filter(function (el) {
                    return el.id !== ingredientId;
                })
            };

            function deleteStep(stepNumber) {
                vm.recipe.nomenclature[vm.currentLanguage].steps =
                    vm.recipe.nomenclature[vm.currentLanguage].steps.filter(function (el) {
                        return el.number !== stepNumber;
                })
            };

            function addStep() {
                let max = 1;
                if(!_.isEmpty(vm.recipe.nomenclature[vm.currentLanguage].steps)) {
                    max = _.max(vm.recipe.nomenclature[vm.currentLanguage].steps, function(step) {
                        return step.number;
                    }).number;
                }

                vm.recipe.nomenclature[vm.currentLanguage].steps.push({
                    number: max+1,
                    desc: ''
                })
            };

        }
    }
});