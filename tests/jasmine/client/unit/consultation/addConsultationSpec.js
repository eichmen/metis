//Testing the addConsultation Controller. Calls to the database should not be tested
describe('AddConsultationCtrl', function () {

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
            controller = $controller('AddConsultationCtrl', {$scope: $scope, $meteor: $meteor});
        }));

        it('should go to app.patients when calling to saveConsultation', function () {
            $scope.saveConsultation();
            expect(state.go).toHaveBeenCalledWith('app.patients');
        });

    });

});