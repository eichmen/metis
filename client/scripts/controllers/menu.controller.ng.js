angular
    .module('Metis')
    .controller('AppCtrl', AppCtrl);

function AppCtrl ($scope,$mdSidenav) {
    $scope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
    };
}
