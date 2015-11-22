Meteor.publish("ingredients", function (options,searchString) {

    if (searchString == null) {
        searchString = '';
    }

    Counts.publish(this, 'numberOfIngredients', Ingredients.find({
        'nomenclature.english.shrtDesc' : { '$regex' : '.*' + searchString ||
        '' + '.*', '$options' : 'i' }}),
        { noReady: true });


    console.log(searchString);
    return Ingredients.find({
        'nomenclature.english.shrtDesc' : { '$regex' : '.*' + searchString ||
        '' + '.*', '$options' : 'i' },
    },options);
    /*return Ingredients.find();*/
});

Meteor.methods({

    loadIngredients : function () {
        var ingredients=[];
        var allJson = Assets.getText('abbrv/all.json');
        console.log('read');
        ingredients = allJson.split('|||');

        _.each(ingredients, function (ingredient) {
            Ingredients.insert(JSON.parse(ingredient));
            console.log('ingredient inserted');
        });
    }

})