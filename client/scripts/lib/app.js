angular
    .module('Metis', [
        'angular-meteor',
        'ui.router',
        'ngMaterial',
        'ngMdIcons',
        'gettext',
        'md.data.table',
        'mdPickers',
        'ui.calendar',
        'ngMessages'
    ])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('pink');

    }).run(function ($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
              if (error === 'AUTH_REQUIRED') {
                $state.go('app.patients');
            }
        });
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                $rootScope.state = toState;
            });
    });

angular.element(document).ready(onReady);

function onReady() {
    angular.bootstrap(document, ['Metis']);
}
