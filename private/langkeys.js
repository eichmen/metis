angular.module('Metis')
    .controller(['gettext', function(gettext) {
        //  Arrays Required for Translation Grunt Task (Do Not Remove)
        var menuItems = [
            gettext("Patients"),
            gettext("Agenda"),
            gettext("Payments"),
            gettext("Recipes"),
            gettext("Nutritional Education")
        ];
    }]);
