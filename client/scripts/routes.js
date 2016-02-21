angular
    .module('Metis')
    .config(config);

function config($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('login', {
            url: '/login',
            template: '<login></login>',
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
            template: '<patient-list></patient-list>',
            data: {
                label: 'Patients'
            }
        })
        .state('app.patientDetails', {
            url: '/patient/:patientId',
            templateUrl: 'client/templates/patients/patientDetails.html',
            controller: 'PatientDetailsCtrl',
            resolve: {
                "currentUser": function () {
                    return Meteor.requireUser();
                }
            },
            data: {
                label: 'Patient information'
            }
        })
          .state('app.patientTabs', {
            url: '/patientTabs/:patientId',
            template: '<patient-tabs></patient-tabs>',
            data: {
                label: 'Patient information',
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
            template: '<agenda></agenda>',
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
            template: '<recipes-list show-selected="{{false}}"></recipes-list>',
            data: {
                label: 'Recipes'
            }
        })
        .state('app.recipeDetails', {
            url: '/recipesDetails/:recipeId',
            template: '<recipe></recipe>',
            data: {
                label: 'Recipe Details'
            }
        })
        .state('app.ingredients', {
            url: '/ingredients',
            template: '<ingredients-list show-selected="{{false}} open-ingredient={{true}}"></ingredients-list>',
            data: {
                label: 'Ingredients'
            }
        })
        .state('app.ingredientDetails', {
            url: '/ingredientDetails/:ingredientId',
            template: '<ingredient></ingredient>',
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
                label: 'Settings'
            }
        })
        .state('app.configureIngredients', {
            url: '/configureIngredients',
            templateUrl: 'client/templates/configure.ingredients.html',
            controller: 'ConfigureIngredientsCtrl',
            data: {
                label: 'Configure Ingredients'
            }
        })
        .state('app.translateIngredient', {
            url: '/translateIngredient:ingredientId',
            templateUrl: 'client/templates/translate.ingredients.html',
            controller: 'TranslateIngredientsCtrl',
            data: {
                label: 'Translate Ingredients'
            }
        })
    ;
    $urlRouterProvider.otherwise('login');
}
