angular
    .module('Metis')
    .config(config);

function config($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('app', {
            url: '',
            abstract: true,
            templateUrl: 'client/templates/menu.html',
            controller: 'AppCtrl'
        })

        .state('app.patients', {
            url: '/patients',
            templateUrl: 'client/templates/patients/patients.html',
            controller: 'PatientsCtrl',
            data: {
                title: 'Patients'
            }
        })
        .state('app.patientDetails', {
            url: '/patient/:patientId',
            templateUrl: 'client/templates/patients/patientDetails.html',
            controller: 'PatientDetailsCtrl',
            resolve: {
                "currentUser": function ($meteor) {
                    return $meteor.requireUser();
                }
            }
        })
        .state('app.addPatient', {
            url: '/newPatient',
            templateUrl: 'client/templates/patients/addPatient.html',
            controller: 'AddPatientCtrl'
        })
        .state('app.addConsultation', {
            url: '/consultation/:patientId',
            templateUrl: 'client/templates/consultations/consultationDetail.html',
            controller: 'AddConsultationCtrl'
        })
        .state('app.consultationDetails', {
            url: '/consultationDetails/:consultationId',
            templateUrl: 'client/templates/consultations/consultationDetail.html',
            controller: 'ConsultationDetailsCtrl'
        })
        .state('app.agenda', {
            url: '/agenda',
            templateUrl: 'client/templates/agenda.html',
            controller: 'AgendaCtrl',
            data: {
                title: 'Agenda'
            }
        })
        .state('app.payments', {
            url: '/payments',
            templateUrl: 'client/templates/payments.html',
            controller: 'PaymentsCtrl',
            data: {
                title: 'Payments'
            }
        })
        .state('app.recipes', {
            url: '/recipes',
            templateUrl: 'client/templates/recipes.html',
            controller: 'RecipesCtrl',
            data: {
                title: 'Recipes'
            }
        })
        .state('app.ingredients', {
            url: '/ingredients',
            templateUrl: 'client/templates/ingredients.html',
            controller: 'IngredientsCtrl',
            data: {
                title: 'Ingredients'
            }
        })
        .state('app.ingredientDetails', {
            url: '/ingredientDetails/:ingredientId',
            templateUrl: 'client/templates/ingredientDetail.html',
            controller: 'IngredientDetailsCtrl'
        })
        .state('app.education', {
            url: '/education',
            templateUrl: 'client/templates/education.html',
            controller: 'EducationCtrl',
            data: {
                title: 'Education'
            }
        })
    ;
    $urlRouterProvider.otherwise('patients');
}
