angular.module('Metis').factory('Utils', function ($mdToast) {
    return {
        toast: function(message) {
            $mdToast.show(
                $mdToast.simple()
                    .content(message)
                    .hideDelay(3000)
            );
        }
    }
});