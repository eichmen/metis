angular.module('Metis').directive('recipeMainInfo', function () {
    return {
        scope: {},
        bindToController: {
            numberOfServings: "=numberOfServings",
            preparationTime: "=preparationTime",
            description: "=description",
            readOnlyMode: "=readOnlyMode"
        },
        restrict: 'E',
        templateUrl: 'client/scripts/components/recipes/details/tabs/mainInfo.html',
        controllerAs: 'vm',
        controller: function ($scope, $reactive) {
            let vm = this;
            $reactive(vm).attach($scope);
        }
    }
});