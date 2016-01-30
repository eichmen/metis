angular.module('Metis').directive('patientAnalytics', function () {
    return {
        scope: {
            patient: "="
        },
        bindToController:true,
        restrict: 'E',
        templateUrl: 'client/scripts/components/patients/tabs/analytic.list.html',
        controllerAs: 'patientAnalytics',
        controller: function ($scope, $reactive,$stateParams,$state) {
            $reactive(this).attach($scope);
            console.log("Patient",this.patient);
            this.analyticDetail=false;
            this.selectedAnalytic={};

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

            console.log("numberOfAnalytics",this.analyticCount);

            this.subscribe('analytics', () => {
                return [
                    {
                        limit: parseInt(this.perPage),
                        skip: parseInt((this.page - 1) * this.perPage),
                        sort: this.sort,
                        /*fields: {
                            date:1
                        }*/

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
                        this.result = result;
                    }
                });

            }
            this.enter = enter;

            function enter(analytic) {
                this.selectedAnalytic = analytic;
                console.log("SelectedAnalytic",this.selectedAnalytic._id);
                this.analyticDetail=true;
            }

            this.newAnalytic = newAnalytic;
            function newAnalytic() {
                this.analyticDetail=true;
            }

            this.activateListView = activateListView;

            function activateListView() {
                this.analyticDetail=false;
            }

        }
    }
});