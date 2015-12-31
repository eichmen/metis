angular.module('Metis').directive('agenda', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/scripts/components/agenda/agenda.html',
        controllerAs: 'agenda',
        controller: function ($scope, $meteor, $state, $compile, uiCalendarConfig, $mdDialog, $mdMedia, $reactive) {
            $reactive(this).attach($scope);

            this.subscribe('agendaEvents');

            this.helpers({
                events: () => {
                    return AgendaEvents.find();
                }
            });

            this.eventSources = [this.events];

            this.addEvent = function(event) {
                this.events.push(event);
            }

            this.remove = function (index) {
                this.events.splice(index, 1);
            };

            /////// AGENDA METHODS

            this.alertOnEventClick = function (event, jsEvent, view) {
                console.log(event.title + ' was clicked ');
                this.selectedEvent = AgendaEvents.findOne(event._id);
                showAdvanced(this.selectedEvent);
            };

            this.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
                AgendaEvents.update(event._id, {
                    $set: {
                        start: new Date(event.start),
                        end: new Date(event.end)
                    }
                })
            };

            this.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
                console.log('Event Resized to make dayDelta ' + delta);
            };

            this.addRemoveEventSource = function (sources, source) {
                var canAdd = 0;
                angular.forEach(sources, function (value, key) {
                    if (sources[key] === source) {
                        sources.splice(key, 1);
                        canAdd = 1;
                    }
                });
                if (canAdd === 0) {
                    sources.push(source);
                }
            };

            this.changeView = function (view, calendar) {
                uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
            };

            this.renderCalender = function (calendar) {
                if (uiCalendarConfig.calendars[calendar]) {
                    uiCalendarConfig.calendars[calendar].fullCalendar('render');
                }
            };

            this.eventRender = function (event, element, view) {
                element.attr({
                    'tooltip': event.title,
                    'tooltip-append-to-body': true
                });
                $compile(element)(this);
            };

            this.uiConfig = {
                calendar: {
                    firstDay: 1,
                    height: 450,
                    editable: true,
                    selectable: true,
                    header: {
                        left: 'title',
                        center: '',
                        right: 'today prev,next'
                    },
                    eventClick: this.alertOnEventClick,
                    eventDrop: this.alertOnDrop,
                    eventResize: this.alertOnResize,
                    eventRender: this.eventRender,
                    select: function (start, end, allDay, jsEvent) {
                        showAdvanced(null, start.toDate());
                    }
                }
            };

            this.showAdvanced = showAdvanced;


            function showAdvanced(event, day) {
                this.selectedEvent = event;
                this.selectedDay = day;
                $mdDialog.show({
                    template: '<agenda-event event="event" day="day"></agenda-event>',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    controllerAs: 'dialog',
                    controller: function($scope,day,event) {
                        $scope.day=day;
                        $scope.event=event;
                        console.log('Event!');
                        console.log($scope);

                    },
                    clickOutsideToClose: true,
                    locals: {
                        day: this.selectedDay,
                        event: this.selectedEvent
                    }
                })
                    .then(function (answer) {
                        this.status = 'You said the information was "' + answer + '".';
                    }, function () {
                        this.status = 'You cancelled the dialog.';
                    });
            }
        }
    }
});