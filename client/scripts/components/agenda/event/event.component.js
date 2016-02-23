angular.module('Metis').directive('agendaEvent', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/scripts/components/agenda/event/event.html',
        bindToController:true,
        controllerAs: 'eventDialog',
        scope: {
            event:'=',
            day:'='
        },
        controller: function ($scope, $mdDialog, Utils, $reactive) {

            $reactive(this).attach($scope);

            this.subscribe('agendaEvents');

            /* New event */
            if (this.event == null) {
                this.newEvent = true;
                this.event = {};
                this.event.start = this.day;
                this.event.end = this.day;

                /* Edit event */
            } else {
                this.event = this.event;
            }

            this.save = save;
            this.update = update;
            this.closeDialog = closeDialog;
            this.removeEvent = removeEvent;

            function save() {
                this.event.owner = Meteor.userId();
                this.event.stick = true;
                AgendaEvents.insert(this.event);
                closeDialog();
                Utils.toast('Event saved');
            }

            function update() {
                console.log('Updating event');
                AgendaEvents.update(this.event._id, {
                    $set: {
                        start: this.event.start,
                        end: this.event.end
                    }
                })
                closeDialog();
                Utils.toast('Event updated');
            }

            function removeEvent() {
                AgendaEvents.remove(this.event._id);
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