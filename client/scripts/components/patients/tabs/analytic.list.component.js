angular.module('Metis').directive('patientAnalytics', function () {
    return {
        scope: {
            patient: "="
        },
        restrict: 'E',
        templateUrl: 'client/scripts/components/patients/tabs/analytic.html',
        controllerAs: 'patientAnalytics',
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
                analytics: () => {
                    return Analytics.find({}, {sort: this.sort});
                },
                analyticCount: () => {
                    return Counts.get('numberOfAnalytics');
                },
                page: 1,

                sort: {
                    date: -1
                },
                selected: []
            });

            this.subscribe('analytics', () => {
                return [
                    {
                        limit: parseInt(this.perPage),
                        skip: parseInt((this.page - 1) * this.perPage),
                        sort: this.sort,
                        fields: {
                            date:1
                        }

                    },
                    this.getReactively('patientId')
                ]
            });

            this.getLastAnalytic = getLastAnalytic;

            function getLastAnalytic() {

                Meteor.call('lastAnalytic', this.patientId, function (error, result) {
                    if (error) {
                        console.log('failed', error);
                    } else {
                        console.log('success lastAnalytic');
                        console.log(result);
                        $scope.result = result;
                    }
                });

            }

            this.newtAnalytic = newtAnalytic;
            function newtAnalytic() {
                $state.go('app.addtAnalytic',{patientId: this.patientId});
            }

        }
    }
});