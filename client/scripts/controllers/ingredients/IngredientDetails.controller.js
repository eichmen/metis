angular
    .module('Metis')
    .controller('IngredientDetailsCtrl', IngredientDetailsCtrl);

function IngredientDetailsCtrl($scope, $meteor, $state, $stateParams) {

    $scope.ingredientId = $stateParams.ingredientId;
    $scope.previousSearchInList = $stateParams.query;

    $scope.$meteorAutorun(function(){
        $scope.$meteorSubscribe('ingredient-details', $scope.getReactively('ingredientId'));
        $scope.ingredient = $scope.$meteorObject(Ingredients, $scope.getReactively('ingredientId'), false);
    });
}
