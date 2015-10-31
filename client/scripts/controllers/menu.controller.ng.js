angular
    .module('Metis')
    .controller('AppCtrl', AppCtrl);

function AppCtrl ($scope) {
    $scope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
    };
}
