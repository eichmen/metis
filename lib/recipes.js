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


Recipes.schema = new SimpleSchema({
    numberOfServings: {type: Number, defaultValue: 1},
    preparationTimeMinutes: {type: Number, optional: true},
    cookingTimeMinutes: {type: Number, optional: true},
    ingredients: {type: [Object], minCount: 1},
    tags: {type: [String], minCount: 1}
});
