angular
    .module('Metis')
    .controller('IngredientDetailsCtrl', IngredientDetailsCtrl);

function IngredientDetailsCtrl($scope, $meteor, $state, $stateParams) {

    $scope.ingredientId = $stateParams.ingredientId;
    $scope.previousSearchInList = $stateParams.query;

    $scope.proximatesShowed = true;
    $scope.mineralsShowed = false;
    $scope.vitaminsShowed = false;
    $scope.lipidsShowed = false;

    $scope.$meteorAutorun(function(){
        $scope.$meteorSubscribe('ingredient-details', $scope.getReactively('ingredientId'));
        $scope.ingredient = $scope.$meteorObject(Ingredients, $scope.getReactively('ingredientId'), false);
    });
}
