angular.module("Metis").directive('login', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/scripts/components/auth/login.html',
        controllerAs: 'login',
        controller: function ($scope, $reactive, $state, translatorService) {
            $reactive(this).attach($scope);

            this.credentials = {
                email: 'metis@metis.com',
                password: 'metis'
            };

            this.error = '';

            this.login = () => {
                Meteor.loginWithPassword(this.credentials.email, this.credentials.password, (err) => {
                    if (err) {
                        this.error = err;
                    }
                    else {
                        translatorService.setLanguage(translatorService.getLanguage());
                        $state.go('app.patients');
                    }
                });
            };
        }
    }
});