angular
    .module('Metis')
    .controller('AgendaCtrl', AgendaCtrl);

function AgendaCtrl ($scope,$meteor,$state,$compile,uiCalendarConfig,$mdDialog,$mdMedia) {

    $scope.search = "";
    $scope.selectedEvent=null;

    $scope.events = $meteor.collection(function() {
        return AgendaEvents.find();
    });

    $scope.$meteorAutorun(function() {
        console.log('Begin');
        $scope.$meteorSubscribe('agendaEvents');
    });

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /* event source that contains custom events on the scope */
    $scope.events2 = [
        {title: 'Rober Drill',start: new Date(y, m, 1)},
        {title: 'Rebeca Faraday',start: new Date(y, m, d - 5)}];

    /* alert on eventClick */
    $scope.alertOnEventClick = function( event, jsEvent, view){
        console.log(event.title + ' was clicked ');
        $scope.selectedEvent = AgendaEvents.findOne(event._id);
        showAdvanced($scope.selectedEvent);
    };
    /* alert on Drop */
    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
        console.log('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
        console.log('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
        var canAdd = 0;
        angular.forEach(sources,function(value, key){
            if(sources[key] === source){
                sources.splice(key,1);
                canAdd = 1;
            }
        });
        if(canAdd === 0){
            sources.push(source);
        }
    };
    /* add custom event*/
    $scope.addEvent = function() {
        $scope.events.push({
            title: 'Open Sesame',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            className: ['openSesame']
        });
    };
    /* remove event */
    $scope.remove = function(index) {
        $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
        if(uiCalendarConfig.calendars[calendar]){
            uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
    };
    /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
            'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    /* config object */
    $scope.uiConfig = {
        calendar:{
            firstDay:1,
            height: 450,
            editable: true,
            selectable: true,
            header:{
                left: 'title',
                center: '',
                right: 'today prev,next'
            },
            eventClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventRender: $scope.eventRender,
            select: function(start, end, allDay, jsEvent) {
                console.log("Select");
            }
        }
    };

    /* event sources array*/
    $scope.eventSources = [$scope.events ,$scope.events2];

    $scope.showAdvanced = showAdvanced;



        function showAdvanced(event) {
        $mdDialog.show({
            templateUrl: 'client/templates/agendaEvent.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose:true,
            locals: {
                event: event
            },
            controller: AgendaEventController
        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
            function AgendaEventController($scope, $mdDialog, event) {
                $scope.event = event;
                $scope.closeDialog = function() {
                    $mdDialog.hide();
                }
            }    };

}