angular
    .module('Metis')
    .controller('TranslateIngredientsCtrl', TranslateIngredientsCtrl);

function TranslateIngredientsCtrl ($scope, $stateParams, $reactive, $state, $mdToast) {



    $scope.ingredientId = $stateParams.ingredientId;

    $scope.helpers({
        ingredient: () => {
            return Ingredients.findOne($scope.getReactively('ingredientId'));
        },
    });

    $scope.subscribe('ingredient-details', () => {
        return [$scope.getReactively('ingredientId')];
    });

    $scope.save = save;

    function save() {

        Meteor.call('updateIngredient', $scope.ingredient, function (error, result) {
            if (error) {
                console.log('failed', error);
            } else {
                console.log('success updateIngredient');
                toast('Ingredient updated');
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

    $scope.printIngredient = printIngredient;

    function printIngredient() {
        console.log($scope.ingredient);
    }
}