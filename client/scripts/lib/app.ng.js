angular
    .module('Metis', [
        'angular-meteor',
        'ui.router',
        'ngMaterial'
    ]);


angular.element(document).ready(onReady);


function onReady() {
    angular.bootstrap(document, ['Metis']);
}