angular
    .module('Metis')
    .controller('IngredientDetailsCtrl', IngredientDetailsCtrl);

function IngredientDetailsCtrl($scope, $meteor, $state, $stateParams, translatorService) {



    $scope.ingredientId = $stateParams.ingredientId;
    $scope.previousSearchInList = $stateParams.query;
    $scope.currentLanguage = translatorService.getLanguage();

    $scope.$meteorAutorun(function () {
        $scope.$meteorSubscribe('ingredient-details', $scope.getReactively('ingredientId'));
        $scope.ingredient = $scope.$meteorObject(Ingredients, $scope.getReactively('ingredientId'), false);
        $scope.types = [
            {
                value: $scope.ingredient.proximates,
                label: 'Proximates'
            },
            {
                value: $scope.ingredient.minerals,
                label: 'Minerals'
            },
            {
                value: $scope.ingredient.vitamins,
                label: 'Vitamins'
            },
            {
                value: $scope.ingredient.lipids,
                label: 'Lipids'
            },
        ]

    });
}
