angular.module('Metis').directive('recipeIngredients', function () {
    return {
        scope: {},
        bindToController: {
            ingredientsRecipe: "=ingredients",
            readOnlyMode: "=readOnlyMode",
            units: "=units"
        },
        restrict: 'E',
        templateUrl: 'client/scripts/components/recipes/details/tabs/ingredients.html',
        controllerAs: 'vm',
        controller: function ($scope, $reactive, $mdMedia, $mdDialog, unitsService, translatorService) {
            let vm = this;
            $reactive(vm).attach($scope);

            vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
            vm.touch = 0;

            vm.deleteIngredient = deleteIngredient;
            vm.addIngredient = addIngredient;
            vm.currentLanguage = translatorService.getLanguage();

            vm.helpers({
                ingredientsNames: () => {
                    return IngredientsRecipe.find({});
                }
            });

            vm.subscribe('recipe-ingredients', () => {

                    console.log('Launching re-subscription');

                    let fields = {
                        'ndbNo': 1,
                        'nomenclature.english.desc': 1,
                        'nomenclature.spanish.desc': 1,
                    };

                    let launch = vm.getReactively('touch');
                    let ingredientsRecipe = vm.getReactively('ingredientsRecipe');
                    let ingredientsIds = [];
                    if (typeof ingredientsRecipe !== 'undefined') {
                        ingredientsIds = ingredientsRecipe.map(function (el) {
                            return el.id;
                        });
                    }

                    console.log(ingredientsIds);

                    return [
                        {
                            fields: fields
                        },
                        ingredientsIds
                    ]
                }
            );

            function deleteIngredient(ingredientId) {
                vm.ingredientsRecipe = vm.ingredientsRecipe.filter(function (el) {
                    return el.id !== ingredientId;
                })
                vm.touch += 1;
            };

            function addIngredient(ev) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;
                $mdDialog.show({
                    templateUrl: 'client/scripts/components/recipes/details/dialogs/ingredients.dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    preserveScope: false,
                    fullscreen: useFullScreen,
                    controllerAs: 'vmDialog',
                    controller: function ($mdDialog) {

                        this.selected = []

                        this.hide = function () {
                            $mdDialog.hide();
                        };

                        this.cancel = function () {
                            $mdDialog.cancel();
                        };

                        this.passIngredients = function () {
                            console.log(this.selected);
                            if (this.selected.length < 20) {
                                $mdDialog.hide(this.selected);
                            }
                        };
                    }

                })
                    .then(function (ingredientsAdded) {

                        let result = _.map(ingredientsAdded, function (el) {
                            return {
                                id: el.ndbNo,
                                unit: unitsService.UNITS.grams,
                                amount: 0
                            }
                        });

                        console.log(result);

                        for (let ingredient of result) {
                            if (vm.ingredientsRecipe.filter(function (el) {
                                    return el.id.toString() === ingredient.id.toString();
                                }).length === 0) {
                                vm.ingredientsRecipe.push(ingredient);
                                vm.touch += 1;
                            }
                        }

                        this.selected = [];
                    }, function () {
                        console.log('No ingredient was added')
                    });
                $scope.$watch(function () {
                    return $mdMedia('xs') || $mdMedia('sm');
                }, function (wantsFullScreen) {
                    vm.customFullscreen = (wantsFullScreen === true);
                });
            };
        }
    }
});