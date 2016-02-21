angular.module('Metis').directive('manageIngredients', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/scripts/components/ingredients/configure/manage.ingredients.html',
        controllerAs: 'manageIngredients',
        bindToController: true,
        controller: function ($scope, $reactive,$state) {
            let vm = this;
            $reactive(vm).attach($scope);

            vm.query = {
                page: 1,
                perPage: 5,
                order: this.getReactively('descInProperLanguage'),
                orderProperty: 1,
                search: '',
                sort: {
                    'nomenclature.english.desc': 1
                },
                group: ''
            };

            vm.descInProperLanguage = `nomenclature.english.desc`;
            vm.currentLanguage = 'english';

            vm.enter = enter;

            vm.helpers({
                ingredients: () => {
                    return Ingredients.find({}, {
                        sort: vm.getReactively('query.sort')
                    });
                },
                ingredientsCount: () => {
                    return Counts.get('numberOfIngredients');
                }
            });

            vm.pageChanged = function (newPage) {
                vm.query.page = newPage;
            };

            vm.onOrderChange = function (order) {
                let sort = {};
                if (order.startsWith('-')) {
                    sort[order.substr(1)] = -1
                } else {
                    sort[order] = 1
                }
                vm.query.sort = sort;
                console.log(order);
                console.log(sort);
            };

            vm.autorun(function () {
                vm.getReactively('query.search');
                vm.query.page = 1;
            });

            vm.onlyActive=false;

            vm.subscribe('ingredients', () => {

                    console.log('Launching re-subscription');
                    console.log(vm.onlyActive);
                    return [
                        {
                            limit: parseInt(vm.getReactively('query.perPage')),
                            skip: (parseInt(vm.getReactively('query.page')) - 1) * parseInt(vm.getReactively('query.perPage')),
                            sort: vm.getReactively('query.sort')
                        },

                        vm.getReactively('query.search'),null,null,vm.getReactively('onlyActive')
                    ]
                }
            );

            function enter(ingredient) {
                    console.log('Ingredient to show: ' + ingredient.nomenclature.english.desc);
                    $state.go('app.translateIngredient', {ingredientId: ingredient._id});
            }


        }
    }
});