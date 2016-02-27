angular.module('Metis').directive('patientList', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/scripts/components/patients/patients.html',
        controllerAs: 'patientList',
        controller: function ($scope, $reactive, $meteor, $state, $mdDialog) {
            let vm = this;
            $reactive(vm).attach($scope);

            /* Data Table variables */
            this.perPage = 5;
            this.page=1;
            this.search='';
            this.selected=[];
            this.sort= {
                name:1
            };

            /* list and count list helpers */
            this.helpers({
                patients: () => {
                    return Patients.find({}, {sort: this.getReactively('sort')});
                },
                patientsCount: () => {
                    return Counts.get('numberOfPatients');
                }});

            /* subscription */
            this.subscribe('patients', () => {
                return [
                    {
                        limit: parseInt(this.getReactively('perPage')),
                        skip: parseInt((this.getReactively('page') - 1) * this.getReactively('perPage')),
                        sort: this.getReactively('sort')
                    },
                    this.getReactively('search')
                ]
            });

            this.remove = remove;
            this.enter = enter;
            this.createPatient = createPatient;

            /* functions */

            function remove(patient) {
                this.patients.remove(patient);
            }

            function enter(patient) {
                $state.go('app.patientTabs', {patientId: patient._id});
            }

            function createPatient() {
                $state.go('app.patientTabs');
            }


            this.showConfirm = function() {
                console.log(this.selected);
                var parentEl = angular.element(document.body);
                $mdDialog.show({
                    parent: parentEl,
                    clickOutsideToClose: true,
                    preserveScope: true,
                    locals: {
                        selected: this.selected
                    },
                    templateUrl: 'client/scripts/components/patients/patients.remove.dialog.html',
                    controller: function DialogController($scope, $mdDialog, selected) {
                        $scope.selected = selected;

                        $scope.nok = function () {
                            $mdDialog.hide();
                        }

                        $scope.ok = function() {
                            angular.forEach($scope.selected, function (value, key) {
                                Patients.remove(value._id);
                                $mdDialog.hide();
                            });
                        }
                    }
                });
            }
        }
    }
});