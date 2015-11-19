angular
    .module('Metis')
    .controller('RecipesCtrl', RecipesCtrl);

function RecipesCtrl ($scope,$meteor,$state) {

    $scope.loadIngredients = loadIngredients;
    $scope.checkPath = checkPath;

    function checkPath() {
        $meteor.call('checkPath');
    }

    function loadIngredients() {
        $meteor.call('loadIngredients');
    }

}