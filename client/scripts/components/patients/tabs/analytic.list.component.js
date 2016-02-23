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

            this.patientId = $stateParams.patientId;

            this.analyticDetail=false;
            this.selectedAnalytic={};

            this.fab = {
                isOpen: false,
                count: 0,
                selectedDirection: 'left'
            };

            /* Data Table variables */
            this.perPage = 5;
            this.page=1;
            this.search='';
            this.selected=[];
            this.sort= {
                date:-1
            };

            /* Helpers */
            this.helpers({
                analytics: () => {
                    return Analytics.find({}, {sort: this.sort});
                },
                analyticCount: () => {
                    return Counts.get('numberOfAnalytics');
                }
            });

            console.log("numberOfAnalytics",this.analyticCount);

            this.subscribe('analytics', () => {
                return [
                    {
                        limit: parseInt(this.getReactively('perPage')),
                        skip: parseInt((this.getReactively('page') - 1) * this.getReactively('perPage')),
                        sort: this.getReactively('sort'),
                    },
                    this.getReactively('patientId')
                ]
            });

            this.getLastAnalytic = getLastAnalytic;
            this.enter = enter;
            this.newAnalytic = newAnalytic;
            this.activateListView = activateListView;

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

            function enter(analytic) {
                this.selectedAnalytic = analytic;
                console.log("SelectedAnalytic",this.selectedAnalytic._id);
                this.analyticDetail=true;
            }


            function newAnalytic() {
                this.analyticDetail=true;
            }

            function activateListView() {
                this.analyticDetail=false;
            }

        }
    }
});