angular
    .module('Metis')
    .controller('IngredientDetailsCtrl', IngredientDetailsCtrl);

function IngredientDetailsCtrl ($scope,$meteor,$state,$stateParams) {

    $scope.ingredient = $meteor.object(Ingredients, $stateParams.ingredientId);
    $scope.$meteorSubscribe('ingredients');
}
