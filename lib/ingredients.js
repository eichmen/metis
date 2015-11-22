Ingredients = new Mongo.Collection('ingredients');

Ingredients.allow({
    insert: function (userId, ingredients) {
        return userId && ingredients.owner === userId;
    },
    update: function (userId, ingredients, fields, modifier) {
        return userId && ingredients.owner === userId;
    },
    remove: function (userId, ingredients) {
        return userId && ingredients.owner === userId;
    }
});