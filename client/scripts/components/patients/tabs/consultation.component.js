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

            this.patientId = $stateParams.patientId;

            this.fab = {
                isOpen: false,
                count: 0,
                selectedDirection: 'left'
            };

            /* Data Table variables */
            this.perPage = 5;
            this.page=1;
            this.search='';
            this.selected=[];
            this.sort= {
                date:-1
            };

            this.helpers({
                consultations: () => {
                    return Consultations.find({}, {sort: this.sort});
                },
                consultCount: () => {
                    return Counts.get('numberOfConsultations');
                }
            });

            this.subscribe('consultations', () => {
                return [
                    {
                        limit: parseInt(this.getReactively('perPage')),
                        skip: parseInt((this.getReactively('page') - 1) * this.getReactively('perPage')),
                        sort: this.getReactively('sort'),
                        fields: {
                            'date': 1,
                            'observations': 1,
                        }
                    },
                    this.getReactively('patientId')
                ]
            });

            this.getLastConsultation = getLastConsultation;

            function getLastConsultation() {

                Meteor.call('lastConsultation', this.patientId, function (error, result) {
                    if (error) {
                        console.log('failed', error);
                    } else {
                        console.log('success lastConsultation');
                        console.log(result);
                        $scope.result = result;
                    }
                });

            }

            this.newConsultation = newConsultation;
            function newConsultation() {
                $state.go('app.addConsultation',{patientId: this.patientId});
            }

        }
    }
});