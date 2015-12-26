Recipes = new Mongo.Collection('recipes');

Recipes.allow({
    insert: function (userId, recipe) {
        return userId;
    },
    update: function (userId, recipe, fields, modifier) {
        return userId;
    },
    remove: function (userId, recipes) {
        return userId;
    }
});
