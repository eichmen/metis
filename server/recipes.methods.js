Meteor.publish("recipes", function (options,searchString) {
    if (searchString == null) {
        searchString = '';
    }

    if (options == null || options.limit == null || options.limit > 15) {
        options.limit=8;
    }

    Counts.publish(this, 'numberOfRecipes', Recipes.find({
            'nomenclature.english.name' : { '$regex' : '.*' + searchString ||
            '' + '.*', '$options' : 'i' }}),
        { noReady: true });

    return Recipes.find({
        'nomenclature.english.name' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' }
    },options);
});

Meteor.methods({

    insertRecipe: function (recipe) {
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        recipe.owner = Meteor.userId();
        Recipes.insert(recipe);
    },
    deleteRecipe: function (recipe) {
        Recipes.remove(recipe);
    },
    updateRecipe: function (recipe) {
        /*var id = recipe._id;
        delete consultation._id;

        Recipes.update({_id: id}, { $set: {
            observations: consultation.observations,
            date: consultation.date,
            modified: new Date()}
        });*/
    }

});
