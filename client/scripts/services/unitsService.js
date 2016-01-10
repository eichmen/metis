angular
    .module('Metis')
    .service('unitsService', [function() {

        const UNITS = {
                grams :  'grams',
                kcal: 'kilocalories',
                ml: 'milliliters',
                l: 'liters',
                tbsp: 'tablespoon',
                cup: 'cup',
                units: 'units',
                x: 'desired'
        }

        this.UNITS = UNITS;

    }]);