Ingredients = new Mongo.Collection('ingredients');

Ingredients.allow({
    insert: function (userId, ingredients) {
        return userId;
    },
    update: function (userId, ingredients, fields, modifier) {
        return userId;
    },
    remove: function (userId, ingredients) {
        return userId;
    }
});