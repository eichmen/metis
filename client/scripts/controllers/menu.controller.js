angular
    .module('Metis')
    .controller('AppCtrl', AppCtrl);

function AppCtrl($scope,$rootScope,$mdSidenav,$state) {

    $rootScope.state = $state.current;

    $scope.menuItems = [
        {
            name: 'Patients',
            icon: 'people',
            sref: 'app.patients'
        },
        {
            name:'Agenda',
            icon: 'event',
            sref: 'app.agenda'
        },
        {
            name:'Payments',
            icon: 'payment',
            sref: 'app.payments'
        },
        {
            name:'Recipes',
            icon: 'receipt',
            sref: 'app.recipes'
        },
        {
            name:'Ingredients',
            icon: '',
            sref: 'app.ingredients'
        },
        {
            name:'Nutritional Education',
            icon: 'insert_emoticon',
            sref: 'app.education'
        },
        {
            name:'Settings',
            icon: 'settings',
            sref: 'app.settings'
        }
    ]

    $scope.openLeftMenu = function () {
        $mdSidenav('left').toggle();
    };
}
