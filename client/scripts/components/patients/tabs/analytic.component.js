angular.module('Metis').directive('analytic', function () {
    return {
        scope: {
            patient: "=",
            analyticId: "=",
            hideDetail: "&"
        },
        bindToController: true,
        restrict: 'E',
        templateUrl: 'client/scripts/components/patients/tabs/analytic.html',
        controllerAs: 'analyticDetail',
        controller: function ($scope, $reactive, $stateParams) {
            $reactive(this).attach($scope);
            var ctrl = this;
            this.button = "";

            if (this.analyticId) {
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
                    if (this.analyticId) {
                        return Analytics.findOne(this.getReactively('analyticId'));
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

                            //TODO review why this.hideDetail() doesn't work
                            ctrl.hideDetail();
                        }
                    });
                } else {

                    Meteor.call('insertAnalytic', this.analytic, this.patient._id, function (error, result) {
                        if (error) {
                            console.log('failed', error);
                        } else {
                            console.log('Analytic saved!');
                            ctrl.hideDetail();
                        }
                    });
                }
            }


        }
    }
});