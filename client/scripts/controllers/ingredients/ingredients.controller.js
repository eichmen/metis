angular
    .module('Metis')
    .controller('IngredientsCtrl', IngredientsCtrl);

function IngredientsCtrl($scope, $reactive, $state, ingredientsService, translatorService) {
    let vm = this;
    $reactive(vm).attach($scope);

    vm.selected = [];
    //This is rather static, so we don´t go to database for it.
    vm.foodGroups = ingredientsService.FOOD_GROUPS;

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

    vm.descInProperLanguage = `nomenclature.${translatorService.getLanguage()}.desc`;
    vm.currentLanguage = translatorService.getLanguage();

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
        vm.getReactively('query.group');
        vm.query.page = 1;
    });

    vm.autorun(function () {
        vm.getReactively('currentLanguage');
        let sort = {};
        sort[vm.descInProperLanguage] = 1;
        vm.query.sort = sort;
    });

    vm.subscribe('ingredients', () => {

            console.log('Launching re-subscription');

            let desc = vm.getReactively('descInProperLanguage');
            let fields = {
                'nomenclature.english.foodGroup': 1,
                'proximates.energKcal.value': 1,
                'proximates.protein.value': 1,
                'proximates.lipidTot.value': 1,
                'proximates.carbohydrt.value': 1
            };
            fields[desc] = 1;

            return [
                {
                    limit: parseInt(vm.getReactively('query.perPage')),
                    skip: (parseInt(vm.getReactively('query.page')) - 1) * parseInt(vm.getReactively('query.perPage')),
                    sort: vm.getReactively('query.sort'),
                    fields: fields
                },
                vm.getReactively('query.search'),
                vm.getReactively('query.group'),
                vm.getReactively('currentLanguage')

            ]
        }
    );

    function enter(ingredient) {
        console.log('Ingredient to show: ' + ingredient.nomenclature.english.desc);
        $state.go('app.ingredientDetails', {ingredientId: ingredient._id});
    }

}
