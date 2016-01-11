angular.module('Metis').directive('patientConsultations', function () {
    return {
        scope: {
            patient: "="
        },
        restrict: 'E',
        templateUrl: 'client/scripts/components/patients/tabs/consultation.html',
        controllerAs: 'patientConsultations',
        controller: function ($scope, $reactive,$stateParams,$state) {
            $reactive(this).attach($scope);

            this.fab = {
                isOpen: false,
                count: 0,
                selectedDirection: 'left'
            };

            this.patientId = $stateParams.patientId;

            this.perPage = 5;
            this.orderProperty = '1';

            this.helpers({
                consultations: () => {
                    return Consultations.find({}, {sort: this.sort});
                },
                consultCount: () => {
                    return Counts.get('numberOfConsultations');
                },
                page: 1,

                sort: {
                    date: 1
                },
                selected: []
            });

            this.subscribe('consultations', () => {
                return [
                    {
                        limit: parseInt(this.perPage),
                        skip: parseInt((this.page - 1) * this.perPage),
                        sort: this.sort,
                        fields: {
                            'date': 1,
                            'observations': 1,
                        }
                    },
                    this.getReactively('patientId')
                ]
            });

            this.newConsultation = newConsultation;
            function newConsultation() {
                $state.go('app.addConsultation',{patientId: this.patientId});
            }

        }
    }
});