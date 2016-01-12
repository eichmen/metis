angular.module('Metis').directive('recipeIngredients', function () {
    return {
        scope: {},
        bindToController: {
            ingredients: "=ingredients",
            readOnlyMode: "=readOnlyMode",
            units: "=units"
        },
        restrict: 'E',
        templateUrl: 'client/scripts/components/recipes/details/tabs/ingredients.html',
        controllerAs: 'vm',
        controller: function ($scope, $reactive) {
            let vm = this;
            $reactive(vm).attach($scope);

            vm.deleteIngredient = deleteIngredient;

            function deleteIngredient(ingredientId) {
                vm.ingredients = vm.ingredients.filter(function (el) {
                    return el.id !== ingredientId;
                })
            };
        }
    }
});