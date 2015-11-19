//Testing the addConsultation Controller. Calls to the database should not be tested
describe('AddConsultationCtrl', function () {

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
            $scope = {};
            $meteor = {
                call: function () {
                }
            };
            $stateParams = {
                patientId: 1
            };
            controller = $controller('AddConsultationCtrl', {
                $scope: $scope,
                $meteor: $meteor,
                $stateParams: $stateParams
            });
        }));

        it('should go to app.patients when calling to saveConsultation', function () {
            $scope.saveConsultation();
            expect(state.go).toHaveBeenCalledWith('app.patientDetails', {patientId: 1});
        });

    });

});