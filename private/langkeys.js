angular.module('Metis')
    .controller(['gettext', function(gettext) {
        //  Arrays Required for Translation Grunt Task (Do Not Remove)
        var menuItems = [
            gettext("Patients"),
            gettext("Agenda"),
            gettext("Payments"),
            gettext("Recipes"),
            gettext("Nutritional Education"),
            gettext("Settings"),
            gettext("Ingredients")
        ];

        var GroupFood = [
            gettext("Dairy and Egg Products"),
            gettext("Spices and Herbs"),
            gettext("Baby Foods"),
            gettext("Fats and Oils"),
            gettext("Poultry Products"),
            gettext("Soups, Sauces, and Gravies"),
            gettext("Sausages and Luncheon Meats"),
            gettext("Breakfast Cereals"),
            gettext("Fruits and Fruit Juices"),
            gettext("Pork Products"),
            gettext("Vegetables and Vegetable Products"),
            gettext("Nut and Seed Products"),
            gettext("Beef Products"),
            gettext("Beverages"),
            gettext("Finfish and Shellfish Products"),
            gettext("Legumes and Legume Products"),
            gettext("Lamb, Veal, and Game Products"),
            gettext("Baked Products"),
            gettext("Sweets"),
            gettext("Cereal Grains and Pasta"),
            gettext("Fast Foods"),
            gettext("Meals, Entrees, and Side Dishes"),
            gettext("Snacks"),
            gettext("American Indian/Alaska Native Foods"),
            gettext("Restaurant Foods")
        ];
    }]);
