//Testing the addPatient Controller. Calls to the database should not be tested
describe('PatientDetailsCtrl', function () {

    beforeEach(module('Metis'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('StateChanges', function () {
        var $scope, controller, $meteor, state, $stateParams;

        beforeEach(inject(function ($state) {
            state = $state;
            spyOn(state, 'go');
            $scope = {
                newConsultation: function () {
                }
            };
            $meteor = {
                object: function () {

                }, collection: function () {

                }
            };
            $stateParams = {
                patientId: 1
            };
            controller = $controller('PatientDetailsCtrl', {
                $scope: $scope,
                $meteor: $meteor,
                $stateParams: $stateParams
            });
        }));

        it('should go to app.addConsultation when calling to newConsultation', function () {
            $scope.newConsultation();
            expect(state.go).toHaveBeenCalledWith('app.addConsultation', {patientId: 1});
        });

    });

});