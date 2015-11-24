Meteor.publish("patients", function (options,searchString) {
    if (searchString == null) {
        searchString = '';
    }

    Counts.publish(this, 'numberOfPatients', Patients.find({
        'name' : { '$regex' : '.*' + searchString ||
        '' + '.*', '$options' : 'i' }}),
        { noReady: true });

    return Patients.find({
        'name' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
        $or: [
            {
                $and: [
                    {"public": true},
                    {"public": {$exists: true}}
                ]
            },
            {
                $and: [
                    {owner: this.userId},
                    {owner: {$exists: true}}
                ]
            }
        ]
    },options);
});
