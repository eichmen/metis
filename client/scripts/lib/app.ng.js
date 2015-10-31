angular
    .module('Metis', [
        'angular-meteor',
        'ui.router',
        'ngMaterial'
    ])
    .config(function ($mdThemingProvider) {



    });


angular.element(document).ready(onReady);


function onReady() {
    angular.bootstrap(document, ['Metis']);
}