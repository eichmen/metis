angular.module('Metis').directive('analytic', function () {
    return {
        scope: {
            patient: "=",
            analyticId: "="
        },
        restrict: 'E',
        templateUrl: 'client/scripts/components/patients/tabs/analytic.html',
        controllerAs: 'analyticDetail',
        controller: function ($scope, $reactive, $stateParams) {
            $reactive(this).attach($scope);
            console.log($scope.patient);
            console.log("Analytic",$scope.analyticId)
            this.analyticId = $scope.analyticId;
            console.log(this.analyticId);

            this.subscribe('analytics', () => {
                return [this.getReactively('analyticId')];
            });

            this.helpers({
                analytic: () => {
                    if (this.analyticId) {
                        return Analytics.findOne(this.getReactively('analyticId'));
                    } else {
                        return {};
                    }
                }
            });

            this.save = save;

            function save() {
                Meteor.call('insertAnalytic', this.analytic,$scope.patient._id, function (error, result) {
                    if (error) {
                        console.log('failed', error);
                    } else {
                        console.log('success updatePatientGeneral');
                    }
                });
            }
        }
    }
});