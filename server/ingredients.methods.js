Meteor.publish("ingredients", function (options,searchString) {

    if (searchString == null) {
        searchString = '';
    }

    if (options == null || options.limit == null || options.limit > 15) {
        console.log(options);
        options.limit=8;
    }

    Counts.publish(this, 'numberOfIngredients', Ingredients.find({
        'nomenclature.english.shrtDesc' : { '$regex' : '.*' + searchString ||
        '' + '.*', '$options' : 'i' }}),
        { noReady: true });


    console.log('Searching string:' +searchString);
    return Ingredients.find({
        'nomenclature.english.shrtDesc' : { '$regex' : '.*' + searchString ||
        '' + '.*', '$options' : 'i' },
    },options);
});

Meteor.publish("ingredient-details", function (idToSearch) {
    return Ingredients.find({
        '_id' : idToSearch
    });
});

Meteor.methods({

    checkIngredients : function () {
        console.log('checking ingredients');
        return Ingredients.find().count()>0?true:false;
    },

    loadIngredients : function () {
        var ingredients=[];
        var allJson = Assets.getText('abbrv/all.json');
        console.log('read');
        ingredients = allJson.split('|||');

        _.each(ingredients, function (ingredient) {
            Ingredients.insert(JSON.parse(ingredient));
            console.log('ingredient inserted');
        });
        return true;
    }

})