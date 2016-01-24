angular.module('Metis').directive('recipe', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/scripts/components/recipes/details/recipeDetails.html',
        controllerAs: 'vm',
        controller: function ($scope, $meteor, $state, $reactive, $stateParams,
                              ingredientsService, translatorService, unitsService,
                              $mdToast) {
            let vm = this;
            $reactive(vm).attach($scope);

            vm.recipeId = $stateParams.recipeId;

            //This is rather static, so we don´t go to database for it.
            vm.foodGroups = ingredientsService.FOOD_GROUPS;

            vm.currentLanguage = translatorService.getLanguage();
            vm.readOnlyMode = !$stateParams.creation || false;
            vm.units = unitsService.UNITS;
            vm.cancel = cancel;
            vm.save = save;
            vm.deleteRecipe = deleteRecipe;

            vm.subscribe('recipe-details', () => {
                return [vm.getReactively('recipeId')];
            });

            vm.helpers({
                recipe: () => {
                    return (Recipes.findOne(vm.getReactively('recipeId')) || {fundamentals: { tags: []}});
                },
                recipeBackUp: () => {
                    return (Recipes.findOne(vm.getReactively('recipeId')) || {fundamentals: { tags: []}});
                }
            });

            function cancel() {
                vm.recipe = angular.copy(vm.recipeBackUp);
                vm.readOnlyMode = true;
            }

            function save() {
                Meteor.call('saveRecipe', vm.recipe, Meteor.userId(), function (error) {
                    if (error) {
                        console.log('failed', error);
                        toast('Ooops, something went wrong saving your recipe');
                    } else {
                        console.log('success save recipe');
                        toast('Recipe updated');
                    }
                });
            }

            function deleteRecipe() {
                Meteor.call('deleteRecipe', vm.recipe, Meteor.userId(), function (error) {
                    if (error) {
                        console.log('failed', error);
                        toast('Ooops, something went wrong deleting your recipe');
                    } else {
                        console.log('success delete recipe');
                        toast('Recipe deleted');
                        $state.go('app.recipes');
                    }
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