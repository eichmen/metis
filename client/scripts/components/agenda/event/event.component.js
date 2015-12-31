angular.module('Metis').directive('agendaEvent', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/scripts/components/agenda/event/event.html',
        controllerAs: '$scope',
        scope: {
            event:'=',
            day:'='
        },
        controller: function ($scope, $mdDialog, Utils, $reactive) {

            $scope.subscribe('agendaEvents');

            /* New event */
            if ($scope.event == null) {
                this.newEvent = true;
                $scope.event = {};
                $scope.event.start = $scope.day;
                $scope.event.end = $scope.day;

                /* Edit event */
            } else {
                $scope.event = $scope.event;
            }

            $scope.save = save;
            $scope.update = update;
            $scope.closeDialog = closeDialog;
            $scope.removeEvent = removeEvent;

            function save() {
                $scope.event.owner = Meteor.userId();
                $scope.event.stick = true;
                AgendaEvents.insert($scope.event);
                closeDialog();
                Utils.toast('Event saved');
            }

            function update() {
                console.log('Updating event');
                AgendaEvents.update($scope.event._id, {
                    $set: {
                        start: $scope.event.start,
                        end: $scope.event.end
                    }
                })
                closeDialog();
                Utils.toast('Event updated');
            }

            function removeEvent() {
                AgendaEvents.remove($scope.event._id);
                closeDialog();
                Utils.toast('Event removed');

            }

            function closeDialog() {
                $mdDialog.hide();
            }
        }
    }
})
;