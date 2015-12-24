angular
    .module('Metis')
    .controller('RecipesCtrl', RecipesCtrl);

function RecipesCtrl ($scope,$meteor,$state, ingredientsService, translatorService) {


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

    $scope.descInProperLanguage = `nomenclature.${translatorService.getLanguage()}.name`;
    $scope.currentLanguage = translatorService.getLanguage();

    $scope.enter = enter;

    $scope.recipes = $meteor.collection(function() {
        return Recipes.find({}, {
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
            'nomenclature.english.group' : 1,
        };
        fields[desc] = 1;

        $scope.$meteorSubscribe('recipes', {
                limit: parseInt($scope.getReactively('query.perPage')),
                skip: (parseInt($scope.getReactively('query.page')) - 1) * parseInt($scope.getReactively('query.perPage')),
                sort: $scope.getReactively('query.sort'),
                fields: fields
            },
            $scope.getReactively('query.search'),
            $scope.getReactively('query.group'),
            $scope.getReactively('currentLanguage')).then(function(){
                $scope.recipesCount = $scope.$meteorObject(Counts ,'numberOfRecipes', false);
            });
    });

    function enter(recipe) {
        console.log('Recipe to show: ' + recipe.nomenclature.english.name);
        $state.go('app.recipeDetails', {recipeId: recipe._id});
    }

}