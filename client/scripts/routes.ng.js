angular
    .module('Metis')
    .config(config);

function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('patients', {
            url: '/patients',
            templateUrl: 'client/templates/patients.ng.html',
            controller: 'PatientsCtrl'
        })
        .state('patientDetails', {
            url: '/patient/:patientId',
            templateUrl: 'client/templates/patientDetails.ng.html',
            controller: 'PatientDetailsCtrl'
        }
    );
    $urlRouterProvider.otherwise('patients');
}