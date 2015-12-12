angular
    .module('Metis')
    .controller('LoginCtrl', LoginCtrl);

function LoginCtrl ($scope,$meteor,$state,translatorService) {

    $scope.credentials = {
        email: 'metis@metis.com',
        password: 'metis'
    };

    $scope.error = '';

    $scope.login = function () {
        $meteor.loginWithPassword($scope.credentials.email, $scope.credentials.password).then(
            function () {
                translatorService.setLanguage(translatorService.getLanguage());
                $state.go('app.patients');
            },
            function (err) {
                $scope.error = 'Login error - ' + err;
            }
        );
    };
}