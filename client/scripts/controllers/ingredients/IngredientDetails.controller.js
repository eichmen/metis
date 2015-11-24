angular
    .module('Metis')
    .controller('IngredientDetailsCtrl', IngredientDetailsCtrl);

function IngredientDetailsCtrl ($scope,$meteor,$state,$stateParams) {

    $scope.ingredient = $scope.$meteorObject
    (Ingredients, $stateParams.ingredientId).subscribe('ingredients');
}
