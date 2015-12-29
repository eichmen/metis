angular.module('Metis').directive('patientList', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/scripts/components/patients/patients.html',
        controllerAs: 'patientList',
        controller: function ($scope, $reactive, $meteor, $state, $mdDialog) {
            let vm = this;
            $reactive(vm).attach($scope);

            this.perPage = 5;
            this.orderProperty = '1';
            this.filter = {
                options: {
                    debounce: 500
                }
            };

            this.helpers({
                patients: () => {
                    return Patients.find({}, {sort: this.sort});
                },
                patientsCount: () => {
                    return Counts.get('numberOfPatients');
                },
                page: 1,

                sort: {
                    name: 1
                },
                search: '',

                selected: []
            });

            this.pageChanged = (newPage) => {
                this.page = newPage;
            };

            this.subscribe('patients', () => {
                return [
                    {
                        limit: parseInt(this.perPage),
                        skip: parseInt((this.page - 1) * this.perPage),
                        sort: this.sort
                    },
                    this.search
                ]
            });

            this.remove = remove;
            this.deletePatients = deletePatients;

            this.enter = enter;

            this.createPatient = createPatient;

            ////////////

            function deletePatients() {
                console.log(selected);
                angular.forEach(selected, function (value, key) {
                    Patients.remove(value);
                });
            }

            function remove(patient) {
                this.patients.remove(patient);
            }

            function enter(patient) {
                $state.go('app.patientTabs', {patientId: patient._id});
            }

            function createPatient() {
                $state.go('app.addPatient');
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