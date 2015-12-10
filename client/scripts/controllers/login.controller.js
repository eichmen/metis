angular
    .module('Metis')
    .controller('LoginCtrl', LoginCtrl);

function LoginCtrl ($scope,$meteor,$state,gettextCatalog) {

    $scope.credentials = {
        email: 'metis@metis.com',
        password: 'metis'
    };

    $scope.error = '';

    $scope.login = function () {
        $meteor.loginWithPassword($scope.credentials.email, $scope.credentials.password).then(
            function () {
                if(Meteor.user().profile.language === 'spanish') {
                    gettextCatalog.setCurrentLanguage('es_ES');
                } else {
                    gettextCatalog.setCurrentLanguage('en_US');
                }
                $state.go('app.patients');
            },
            function (err) {
                $scope.error = 'Login error - ' + err;
            }
        );
    };
}