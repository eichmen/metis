//Testing the Patients Controller. Calls to the database should not be tested
describe('PatientsCtrl', function () {

    beforeEach(module('Metis'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('StateChanges', function () {
        var $scope, controller, $meteor, state;

        beforeEach(inject(function ($state) {
            state = $state;
            spyOn(state, 'go');
            $scope = {
                enter: function () {
                },
                createPatient: function () {
                },
                getReactively: function () {
                },
                $watch: function () {
                },
                $meteorAutorun: function () {
                }
            };
            $meteor = {
                collection: function () {
                    return {
                        subscribe: function () {
                        }
                    }
                }
            };
            controller = $controller('PatientsCtrl', {$scope: $scope, $meteor: $meteor});
        }));

        it('should go to app.patientDetails when calling to enter, with id of the patient', function () {
            $scope.enter({_id: 1});
            expect(state.go).toHaveBeenCalledWith('app.patientDetails', {patientId: 1});
        });

        it('should go to app.addPatient when calling createPatient', function () {
            $scope.createPatient();
            expect(state.go).toHaveBeenCalledWith('app.addPatient');
        });

    });

});