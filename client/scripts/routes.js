angular
    .module('Metis')
    .config(config);

function config($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: 'client/templates/login.html',
            controller: 'LoginCtrl'
        })

        .state('app', {
            url: '',
            abstract: true,
            templateUrl: 'client/templates/menu.html',
            controller: 'AppCtrl',
            data: {
                label: 'Home'
            }
        })

        .state('app.patients', {
            url: '/patients',
            templateUrl: 'client/templates/patients/patients.html',
            controller: 'PatientsCtrl',
            data: {
                label: 'Patients'
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
            },
            data: {
                label: 'Patient information'
            }
        })
        .state('app.patientTabs', {
            url: '/patientTabs/:patientId',
            templateUrl: 'client/templates/patients/patientTabs.html',
            controller: 'PatientTabsCtrl',
            resolve: {
                "currentUser": function ($meteor) {
                    return $meteor.requireUser();
                }
            },
            data: {
                label: 'Patient information'
            }
        })
        .state('app.addPatient', {
            url: '/newPatient',
            templateUrl: 'client/templates/patients/addPatient.html',
            controller: 'AddPatientCtrl',
            data: {
                label: 'New Patient'
            }
        })
        .state('app.addConsultation', {
            url: '/consultation/:patientId',
            templateUrl: 'client/templates/consultations/consultationDetail.html',
            controller: 'AddConsultationCtrl',
            data: {
                label: 'New Consultation'
            }
        })
        .state('app.consultationDetails', {
            url: '/consultationDetails/:consultationId',
            templateUrl: 'client/templates/consultations/consultationDetail.html',
            controller: 'ConsultationDetailsCtrl',
            data: {
                label: 'Consultation Details'
            }
        })
        .state('app.agenda', {
            url: '/agenda',
            templateUrl: 'client/templates/agenda.html',
            controller: 'AgendaCtrl',
            data: {
                label: 'Agenda'
            }
        })
        .state('app.payments', {
            url: '/payments',
            templateUrl: 'client/templates/payments.html',
            controller: 'PaymentsCtrl',
            data: {
                label: 'Payments'
            }
        })
        .state('app.recipes', {
            url: '/recipes',
            templateUrl: 'client/templates/recipes.html',
            controller: 'RecipesCtrl',
            data: {
                label: 'Recipes'
            }
        })
        .state('app.ingredients', {
            url: '/ingredients',
            templateUrl: 'client/templates/ingredients/ingredients.html',
            controller: 'IngredientsCtrl',
            data: {
                label: 'Ingredients'
            }
        })
        .state('app.ingredientDetails', {
            url: '/ingredientDetails/:ingredientId',
            templateUrl: 'client/templates/ingredients/ingredientDetail.html',
            controller: 'IngredientDetailsCtrl',
            data: {
                label: 'Ingredient Details'
            }
        })
        .state('app.education', {
            url: '/education',
            templateUrl: 'client/templates/education.html',
            controller: 'EducationCtrl',
            data: {
                label: 'Education'
            }
        })
        .state('app.settings', {
            url: '/settings',
            templateUrl: 'client/templates/settings.html',
            controller: 'SettingsCtrl',
            data: {
                label: 'Setttings'
            }
        })
    ;
    $urlRouterProvider.otherwise('login');
}
