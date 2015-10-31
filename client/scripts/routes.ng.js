angular
    .module('Metis')
    .config(config);

function config($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
            url: '',
            abstract: true,
            templateUrl: 'client/templates/menu.ng.html',
            controller: 'AppCtrl'
        })

        .state('app.patients', {
            url: '/patients',
            templateUrl: 'client/templates/patients.ng.html',
            controller: 'PatientsCtrl',
            data: {
                title: 'Patients'
            }
        })
        .state('app.patientDetails', {
            url: '/patient/:patientId',
            templateUrl: 'client/templates/patientDetails.ng.html',
            controller: 'PatientDetailsCtrl'
        })
        .state('app.addPatient', {
            url: '/newPatient',
            templateUrl: 'client/templates/addPatient.ng.html',
            controller: 'AddPatientCtrl'
        }
    );
    $urlRouterProvider.otherwise('patients');
}