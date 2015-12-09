angular
    .module('Metis', [
        'angular-meteor',
        'ui.router',
        'accounts.ui',
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
        
    }).run(function ($rootScope, $state,gettextCatalog) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireUser promise is rejected
            // and redirect the user back to the main page
            if (error === 'AUTH_REQUIRED') {
                $state.go('app.patients');
            }
        });
        gettextCatalog.setCurrentLanguage('es_ES');
    });


angular.element(document).ready(onReady);


function onReady() {
    angular.bootstrap(document, ['Metis']);
}
