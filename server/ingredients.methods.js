Meteor.publish("ingredients", function (options,searchString, groupFood, language) {

    if (searchString == null) {
        searchString = '';
    }

    let query = {};
    if(language == 'spanish') {
        query = {
            'nomenclature.spanish.desc' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' }
        };
    } else {
        query = {
            'nomenclature.english.desc' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' }
        };
    }

    if (groupFood !== null && groupFood !== '') {
        query['nomenclature.english.foodGroup'] = groupFood;
    }

    if (options == null || options.limit == null || options.limit > 15) {
        console.log(options);
        options.limit=8;
    }

    Counts.publish(this, 'numberOfIngredients', Ingredients.find(query),
        { noReady: true });

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