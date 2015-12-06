describe('AgendaCtrl', function() {

    beforeEach(module('Metis'));

    /*
     * Get a new controller before each test is executed
     */
    var $controller = {};

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('$scope.events', function() {

        var $scope, controller, events;

        beforeEach(function() {

            events = [{_id:1,title:'New Event'}];

            $scope = {
                addEvent: function() {},
                $meteorAutorun: function () {},
                $meteorSubscribe: function () {
                    return {then: function () {}}
                },
                $meteorObject: function () {}
            };
            $meteor = {
                object: function () {
                    return {
                        subscribe: function () {
                        }
                    }
                }, collection: function () {

                }
            };
            controller = $controller('AgendaCtrl', {
                $scope: $scope,
                $meteor: $meteor
            });
            $scope.events = events;
        });

        it('should have events2', function() {
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var expected = {title: 'Rober Drill', start: new Date(y, m, 1)};
            expect($scope.events2).toContain(expected);
        });

        it('should include a new event', function() {
            var eventsSize = $scope.events.length;
            $scope.addEvent({title: 'Rober Drill', start: new Date(2015, 11, 1)});
            expect(eventsSize+1).toEqual($scope.events.length);
        })

    })


})