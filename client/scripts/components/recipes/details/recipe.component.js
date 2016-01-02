angular.module('Metis').directive('recipe', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/scripts/components/recipes/details/recipeDetails.html',
        controllerAs: 'vm',
        controller: function ($scope, $meteor, $state, $reactive, ingredientsService, translatorService) {

        }
    }
});