angular.module('Metis').directive('analytic', function () {
    return {
        scope: {
            patient: "=",
            analyticid: "=",
            hideDetail: "&"
        },
        bindToController: true,
        restrict: 'E',
        templateUrl: 'client/scripts/components/patients/tabs/analytic.html',
        controllerAs: 'analyticDetail',
        controller: function ($scope, $reactive, $stateParams) {
            $reactive(this).attach($scope);

            this.button = "";

            if (this.analyticid) {
                this.buttonTitle = "Update";
            } else {
                this.buttonTitle = "Save";
            }

            this.subscribe('analytics', () => {
                return [
                    {},
                    this.getReactively('analyticId')
                ];
            });
            this.helpers({
                analytic: () => {
                    if (this.analyticid) {
                        return Analytics.findOne(this.getReactively('analyticid'));
                    } else {
                        return {
                            date: new Date(),
                            cbc: {}
                        };
                    }
                }
            });

            this.save = save;

            function save() {

                if (this.analytic._id) {
                    Meteor.call('updateAnalytic', this.analytic, function (error, result) {
                        if (error) {
                            console.log('failed', error);
                        } else {
                            console.log('Analytic saved!');
                            this.hideDetail();
                        }
                    });
                } else {

                    Meteor.call('insertAnalytic', this.analytic, this.patient._id, function (error, result) {
                        if (error) {
                            console.log('failed', error);
                        } else {
                            console.log('Analytic saved!');
                            this.hideDetail();
                        }
                    });
                }
            }


        }
    }
});