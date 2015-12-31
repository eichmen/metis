angular.module('Metis').directive('agendaEvent', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/scripts/components/agenda/event/event.html',
        controllerAs: 'event',
        scope: {
            event:'=',
            day:'='
        },
        controller: function ($scope, $mdDialog, $mdToast, $reactive) {
            let vm = $reactive(this).attach($scope);
            console.log(vm.day);
            console.log(vm.event);
            console.log(vm);
            this.subscribe('agendaEvents');

            /* New event */
            if (vm.event == null) {
                this.newEvent = true;
                vm.event = {};
                vm.event.start = vm.day;
                vm.event.end = vm.day;

                /* Edit event */
            } else {
                vm.event = vm.event;
            }

            vm.save = save;
            vm.update = update;
            vm.closeDialog = closeDialog;
            vm.removeEvent = removeEvent;
            vm.toast = toast;

            function save() {
                vm.event.owner = Meteor.userId();
                vm.event.stick = true;
                AgendaEvents.insert(vm.event);
                closeDialog();
                toast('Event saved');
            }

            function update() {
                console.log('Updating event');
                AgendaEvents.update(vm.event._id, {
                    $set: {
                        start: vm.event.start,
                        end: vm.event.end
                    }
                })
                closeDialog();
                toast('Event updated');
            }

            function removeEvent() {
                AgendaEvents.remove(vm.event._id);
                closeDialog();
                toast('Event removed');

            }

            function closeDialog() {
                $mdDialog.hide();
            }

            function toast(message) {
                $mdToast.show(
                    $mdToast.simple()
                        .content(message)
                        .hideDelay(3000)
                );

            }


        }
    }
})
;