angular.module('Metis').directive('recipe', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/scripts/components/recipes/details/recipeDetails.html',
        controllerAs: 'vm',
        controller: function ($scope, $meteor, $state, $reactive, $stateParams, ingredientsService, translatorService) {
            let vm = this;
            $reactive(vm).attach($scope);

            vm.recipeId = $stateParams.recipeId;

            //This is rather static, so we don´t go to database for it.
            vm.foodGroups = ingredientsService.FOOD_GROUPS;

            vm.currentLanguage =  translatorService.getLanguage();

            vm.subscribe('recipe-details', () => {
                return [vm.getReactively('recipeId')];
            });

            vm.helpers({
                recipe: () => {
                    return (Recipes.findOne(this.getReactively('recipeId')) || {});
                }
            });

        }
    }
});