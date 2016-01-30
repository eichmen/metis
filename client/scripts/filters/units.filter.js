angular
    .module('Metis')
    .filter('unitsFilter', function (unitsService) {

        function uiUnit(unit) {
            if (unit != null) {
                return unitsService.UNITS[unit] || unit;
            }
        }

        return function (unit) {
            return uiUnit(unit);
        };
    });