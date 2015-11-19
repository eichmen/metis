//Testing the addPatient Controller. Calls to the database should not be tested
describe('AddPatientCtrl', function () {

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
                savePatient: function () {
                },
                patients: {
                    push : function() {
                    }
                }
            };
            $meteor = {
                collection: function () {
                    return {
                        push: function () {

                        }
                    }
                }
            };
            controller = $controller('AddPatientCtrl', {$scope: $scope, $meteor: $meteor});
        }));

        it('should go to app.patients when calling to savePatient', function () {
            $scope.savePatient();
            expect(state.go).toHaveBeenCalledWith('app.patients');
        });
    });
});