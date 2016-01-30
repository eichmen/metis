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

Meteor.publish("recipe-details", function (idToSearch) {
    return Recipes.find({
        '_id' : idToSearch
    });
});

Meteor.methods({

    saveRecipe: function(recipe) {

        if(recipe._id) {
            Recipes.update(
                {'_id' : recipe._id},
                recipe
            );
        } else {
            Recipes.insert(recipe);
        }

    },

    deleteRecipe: function(recipe) {
        if(recipe._id) {
            Recipes.remove(
                {'_id' : recipe._id}
            );
        }
    }

});
