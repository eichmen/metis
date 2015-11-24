angular
    .module('Metis')
    .controller('IngredientDetailsCtrl', IngredientDetailsCtrl);

function IngredientDetailsCtrl ($scope,$meteor,$state,$stateParams) {
    console.log('Detalle:'+$stateParams.ingredientId);

    $scope.$meteorSubscribe('ingredients', {},{});

    $scope.ingredient = $scope.$meteorObject
    (Ingredients, $stateParams.ingredientId);
}
