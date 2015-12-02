Meteor.publish("agendaEvents", function (options,searchString) {

    if (searchString == null) {
        searchString = '';
    }

    if (options == null || options.limit == null || options.limit > 15) {
        console.log(options);
        options = {};
        options.limit=8;
    }

    Counts.publish(this, 'numberOfAgendaEvents', AgendaEvents.find({
        'title' : { '$regex' : '.*' + searchString ||
        '' + '.*', '$options' : 'i' }}),
        { noReady: true });


    console.log('Searching string:' +searchString);
    return AgendaEvents.find({
        'title' : { '$regex' : '.*' + searchString ||
        '' + '.*', '$options' : 'i' },
    },options);
});

Meteor.methods({

})