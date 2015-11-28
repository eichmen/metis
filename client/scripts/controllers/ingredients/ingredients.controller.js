angular
    .module('Metis')
    .controller('IngredientsCtrl', IngredientsCtrl);

function IngredientsCtrl ($scope,$meteor,$state) {

    $scope.selected = [];

    $scope.query = {
        page: 1,
        perPage: 5,
        order: 'nomenclature.english.shrtDesc',
        orderProperty: 1,
        search: '',
        sort: {
            'nomenclature.english.shrtDesc' : 1
        }
    }

    $scope.enter = enter;

    $scope.ingredients = $meteor.collection(function() {
        return Ingredients.find({}, {
            sort : $scope.getReactively('query.sort')
        });
    });

    $scope.pageChanged = function(newPage) {
        $scope.query.page = newPage;
    };

    $scope.onOrderChange = function(order) {
        var sort = {};
        if(order.startsWith('-')) {
            sort[order.substr(1)] = -1
        } else {
            sort[order] = 1
        }
        $scope.query.sort = sort;
    };

    $scope.$meteorAutorun(function() {

        $scope.$meteorSubscribe('ingredients', {
                limit: parseInt($scope.getReactively('query.perPage')),
                skip: (parseInt($scope.getReactively('query.page')) - 1) * parseInt($scope.getReactively('query.perPage')),
                sort: $scope.getReactively('query.sort'),
                fields: {
                        'nomenclature.english.shrtDesc' : 1,
                        'nomenclature.english.foodGroup': 1,
                        'proximates.energKcal.value': 1,
                        'proximates.protein.value': 1,
                        'proximates.lipidTot.value': 1,
                        'proximates.carbohydrt.value': 1
                    }
            },
            $scope.getReactively('query.search')).then(function(){
                $scope.ingredientsCount = $scope.$meteorObject(Counts ,'numberOfIngredients', false);
            });
    });

    function enter(ingredient) {
        console.log('Lista:'+ingredient._id);
        //$state.go('app.ingredientDetails', {ingredientId: ingredient._id});
    }

}