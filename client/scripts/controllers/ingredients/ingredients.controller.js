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

    $scope.$meteorAutorun(function() {

        console.log('Begin');
        console.log($scope.getReactively('perPage'));
        console.log($scope.getReactively('page'));

        $scope.$meteorSubscribe('ingredients', {
                fields: {'nomenclature.english.shrtDesc': 1,
                  'nomenclature.english.foodGroup': 1,
                  'proximates.energKcal.value': 1,
                  'proximates.protein.value': 1,
                  'proximates.lipidTot.value': 1,
                  'proximates.carbohydrt.value': 1},
                limit: parseInt($scope.getReactively('perPage')),
                skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
                sort: $scope.getReactively('sort')
            },
            $scope.getReactively('search')).then(function(){
                $scope.ingredientsCount = $scope.$meteorObject(Counts ,'numberOfIngredients', false);

            });

    });

    function enter(ingredient) {
        console.log('Lista:'+ingredient._id);
        $state.go('app.ingredientDetails', {ingredientId: ingredient._id});
    }

}
