angular
    .module('Metis')
    .filter('ageFilter', function () {
        function calculateAge(birthday) {

            if (birthday != null) {
                // birthday is a date
                var ageDifMs = Date.now() - birthday.getTime();
                var ageDate = new Date(ageDifMs); // miliseconds from epoch
                return Math.abs(ageDate.getUTCFullYear() - 1970);
            }
        }

        return function (birthdate) {
            return calculateAge(birthdate);
        };
    });