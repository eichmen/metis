angular
    .module('Metis')
    .controller('IngredientsCtrl', IngredientsCtrl);

function IngredientsCtrl ($scope,$meteor,$state, $stateParams) {

    $scope.selected = [];

    $scope.query = {
        page: 1,
        perPage: 5,
        order: 'nomenclature.english.desc',
        orderProperty: 1,
        search: '',
        sort: {
            'nomenclature.english.shrtDesc' : 1
        },
        group: ''
    }

    //This is rather static, so we don´t go to database for it.
    $scope.foodGroups = [
        "Dairy and Egg Products",
        "Spices and Herbs",
        "Baby Foods",
        "Fats and Oils",
        "Poultry Products",
        "Soups, Sauces, and Gravies",
        "Sausages and Luncheon Meats",
        "Breakfast Cereals",
        "Fruits and Fruit Juices",
        "Pork Products",
        "Vegetables and Vegetable Products",
        "Nut and Seed Products",
        "Beef Products",
        "Beverages",
        "Finfish and Shellfish Products",
        "Legumes and Legume Products",
        "Lamb, Veal, and Game Products",
        "Baked Products",
        "Sweets",
        "Cereal Grains and Pasta",
        "Fast Foods",
        "Meals, Entrees, and Side Dishes",
        "Snacks",
        "American Indian/Alaska Native Foods",
        "Restaurant Foods"
    ];

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

    $scope.$watch('query.search', function() {
        $scope.query.page = 1;
    });

    $scope.$meteorAutorun(function() {
        $scope.$meteorSubscribe('ingredients', {
                limit: parseInt($scope.getReactively('query.perPage')),
                skip: (parseInt($scope.getReactively('query.page')) - 1) * parseInt($scope.getReactively('query.perPage')),
                sort: $scope.getReactively('query.sort'),
                fields: {
                        'nomenclature.english.desc' : 1,
                        'nomenclature.english.foodGroup': 1,
                        'proximates.energKcal.value': 1,
                        'proximates.protein.value': 1,
                        'proximates.lipidTot.value': 1,
                        'proximates.carbohydrt.value': 1
                    }
            },
            $scope.getReactively('query.search'),
            $scope.getReactively('query.group')).then(function(){
                $scope.ingredientsCount = $scope.$meteorObject(Counts ,'numberOfIngredients', false);
            });
    });

    function enter(ingredient) {
        console.log('Ingredient to show: ' + ingredient.nomenclature.english.desc);
        $state.go('app.ingredientDetails', {ingredientId: ingredient._id});
    }

}
