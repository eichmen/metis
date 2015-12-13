angular
    .module('Metis')
    .controller('IngredientsCtrl', IngredientsCtrl);

function IngredientsCtrl ($scope,$meteor,$state, $stateParams, ingredientsService, translatorService) {

    $scope.selected = [];
    //This is rather static, so we don´t go to database for it.
    $scope.foodGroups = ingredientsService.FOOD_GROUPS;

    $scope.query = {
        page: 1,
        perPage: 5,
        order: $scope.getReactively('descInProperLanguage'),
        orderProperty: 1,
        search: '',
        sort: {
            'nomenclature.english.desc' : 1
        },
        group: ''
    }

    $scope.descInProperLanguage = `nomenclature.${translatorService.getLanguage()}.desc`;
    $scope.currentLanguage = translatorService.getLanguage();

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
        let sort = {};
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

    $scope.$watch('currentLanguage', function() {
        let sort = {};
        sort[$scope.descInProperLanguage] = 1;
        $scope.query.sort = sort;
    });

    $scope.$meteorAutorun(function() {

        let desc = $scope.getReactively('descInProperLanguage');
        let fields = {
            'nomenclature.english.foodGroup' : 1,
            'proximates.energKcal.value': 1,
            'proximates.protein.value': 1,
            'proximates.lipidTot.value': 1,
            'proximates.carbohydrt.value': 1
        };
        fields[desc] = 1;

        $scope.$meteorSubscribe('ingredients', {
                limit: parseInt($scope.getReactively('query.perPage')),
                skip: (parseInt($scope.getReactively('query.page')) - 1) * parseInt($scope.getReactively('query.perPage')),
                sort: $scope.getReactively('query.sort'),
                fields: fields
            },
            $scope.getReactively('query.search'),
            $scope.getReactively('query.group'),
            $scope.getReactively('currentLanguage')).then(function(){
                $scope.ingredientsCount = $scope.$meteorObject(Counts ,'numberOfIngredients', false);
            });
    });

    function enter(ingredient) {
        console.log('Ingredient to show: ' + ingredient.nomenclature.english.desc);
        $state.go('app.ingredientDetails', {ingredientId: ingredient._id});
    }

}
