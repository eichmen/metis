Meteor.publish("patients", function (options,searchString) {
    if (searchString == null) {
        searchString = '';
    }

    if (options == null || options.limit == null || options.limit > 15) {
        console.log(options);
        options.limit=8;
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

Meteor.methods({

    updatePatientGeneral: function (patient) {
        // Make sure the user is logged in before inserting a task
        console.log('[server] updatePatientGeneral');
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        if (!patient.owner) {
            patient.owner = Meteor.userId();
        }
        console.log('[server] pre updatePatientGeneral');
        console.log(patient)
        var id = patient._id;

        Patients.update({_id: id}, { 
            $set: {
                name: patient.name,
                lastname: patient.lastname,
                gender: patient.gender,
                birthdate: patient.birthdate,
                phone: patient.phone,
                email: patient.email,
                owner: patient.owner
            }
        });
    }
    
});
