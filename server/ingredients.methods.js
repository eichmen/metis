Meteor.publish("ingredients", function (options,searchString, groupFood) {

    if (searchString == null) {
        searchString = '';
    }

    var query = {
        'nomenclature.english.shrtDesc' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' }
    };

    console.log('groupFood: ' + groupFood);

    if (groupFood !== null && groupFood !== '') {
        query['nomenclature.english.foodGroup'] = groupFood;
    }

    if (options == null || options.limit == null || options.limit > 15) {
        console.log(options);
        options.limit=8;
    }

    Counts.publish(this, 'numberOfIngredients', Ingredients.find(query),
        { noReady: true });


    console.log('Searching string:' +searchString);
    return Ingredients.find(query,options);
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