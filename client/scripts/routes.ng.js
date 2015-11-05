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
        })
        .state('app.addConsultation', {
            url: '/consultation/:patientId',
            templateUrl: 'client/templates/addConsultation.ng.html',
            controller: 'AddConsultationCtrl'
        })
        .state('app.agenda', {
            url: '/agenda',
            templateUrl: 'client/templates/agenda.ng.html',
            controller: 'AgendaCtrl',
            data: {
                title: 'Agenda'
            }
        })
        .state('app.payments', {
            url: '/payments',
            templateUrl: 'client/templates/payments.ng.html',
            controller: 'PaymentsCtrl',
            data: {
                title: 'Payments'
            }
        })
        .state('app.recipes', {
            url: '/recipes',
            templateUrl: 'client/templates/recipes.ng.html',
            controller: 'RecipesCtrl',
            data: {
                title: 'Recipes'
            }
        })
        .state('app.education', {
            url: '/education',
            templateUrl: 'client/templates/education.ng.html',
            controller: 'EducationCtrl',
            data: {
                title: 'Education'
            }
        })
    ;
    $urlRouterProvider.otherwise('patients');
}