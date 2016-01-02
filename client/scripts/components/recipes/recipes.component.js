angular.module('Metis').directive('recipesList', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/scripts/components/recipes/recipes.html',
        controllerAs: 'recipes',
        controller: function ($scope, $meteor, $state, $reactive, ingredientsService, translatorService) {
            let vm = this;
            $reactive(vm).attach($scope);

            vm.selected = [];
            //This is rather static, so we don´t go to database for it.
            vm.foodGroups = ingredientsService.FOOD_GROUPS;

            vm.query = {
                page: 1,
                perPage: 5,
                order: vm.getReactively('descInProperLanguage'),
                orderProperty: 1,
                search: '',
                sort: {
                    'nomenclature.english.desc' : 1
                },
                group: ''
            }

            vm.descInProperLanguage = `nomenclature.${translatorService.getLanguage()}.name`;
            vm.currentLanguage = translatorService.getLanguage();

            vm.enter = enter;

            vm.helpers({
                recipes: () => {
                    return Recipes.find({}, {
                        sort: vm.getReactively('query.sort')
                    });
                },
                recipesCount: () => {
                    return Counts.get('numberOfRecipes');
                }
            });

            vm.pageChanged = function(newPage) {
                vm.query.page = newPage;
            };

            vm.onOrderChange = function(order) {
                let sort = {};
                if(order.startsWith('-')) {
                    sort[order.substr(1)] = -1
                } else {
                    sort[order] = 1
                }
                vm.query.sort = sort;
            };

            vm.autorun(function () {
                vm.getReactively('query.search');
                vm.query.page = 1;
            });

            vm.autorun(function () {
                vm.getReactively('currentLanguage');
                let sort = {};
                sort[vm.descInProperLanguage] = 1;
                vm.query.sort = sort;
            });

            vm.subscribe('recipes', () => {

                    console.log('Launching re-subscription');

                    let desc = vm.getReactively('descInProperLanguage');
                    let fields = {
                        'nomenclature.english.group' : 1,
                    };
                    fields[desc] = 1;

                    return [
                        {
                            limit: parseInt(vm.getReactively('query.perPage')),
                            skip: (parseInt(vm.getReactively('query.page')) - 1) * parseInt(vm.getReactively('query.perPage')),
                            sort: vm.getReactively('query.sort'),
                            fields: fields
                        },
                        vm.getReactively('query.search')
                    ]
                }
            );

            function enter(recipe) {
                console.log('Recipe to show: ' + recipe.nomenclature.english.name);
                $state.go('app.recipeDetails', {recipeId: recipe._id, creation: false});
            }

            function createRecipe() {
                $state.go('app.recipeDetails', {creation: true});
            }

        }
    }
});