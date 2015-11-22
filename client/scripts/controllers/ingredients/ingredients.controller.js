angular
    .module('Metis')
    .controller('IngredientsCtrl', IngredientsCtrl);

function IngredientsCtrl ($scope,$meteor,$state) {

    $scope.page = 1;
    $scope.perPage = 5;
    $scope.sort = {"nomenclature.english.shrtDesc": 1};
    $scope.orderProperty = '1';

    $scope.search = "";

    $scope.enter = enter;


    $scope.ingredients = $meteor.collection(function() {
        return Ingredients.find({}, {
            sort : $scope.getReactively('sort')
        });
    });

    $scope.pageChanged = function(newPage) {
        $scope.page = newPage;
    };

    $scope.$watch('orderProperty', function(){
        if ($scope.orderProperty)
            $scope.sort = {name: parseInt($scope.orderProperty)};
    });

    $meteor.autorun($scope, function() {

        $meteor.subscribe('ingredients', {
                limit: parseInt($scope.getReactively('perPage')),
                skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
                sort: $scope.getReactively('sort')
            },
            $scope.getReactively('search')).then(function(){
                $scope.ingredientsCount = $meteor.object(Counts ,'numberOfIngredients', false);
                console.log($scope.ingredientsCount);
            });

    });

    function enter(ingredient) {
        $state.go('app.ingredientDetails', {ingredientId: ingredient._id});
    }

}