Meteor.publish("analytics", function (options, patientSelected) {
    console.log("PatientSelected", patientSelected);
    Counts.publish(this, 'numberOfAnalytics', Patients.find({
            $and: [
                {owner: this.userId},
                {owner: {$exists: true}},
                {patientId: patientSelected}
            ]
        }),
        {noReady: true});

    return Analytics.find({
        $and: [
            {owner: this.userId},
            {owner: {$exists: true}},
            {patientId: patientSelected}
        ]
    }, options);
});

Meteor.methods({

    lastAnalytic: function (patientId) {
        console.log(patientId);
        var result = Analytics.findOne({patientId: patientId}, {fields: {date: 1}, sort: {date: -1}});
        console.log(result);
        return result;
    },

    insertAnalytic: function (analytic, patientId) {
        // Make sure the user is logged in before inserting a task
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        analytic.owner = Meteor.userId();
        analytic.patientId = patientId;
        Analytics.insert(analytic);

        Patients.update({_id: analytic.patientId}, {
            $set: {
                lastAnalytic: Analytics.findOne({patientId: analytic.patientId}, {fields: {date: 1}, sort: {date: -1}})
            }
        });


    },
    deleteAnalytic: function (analyticId) {
        Analytics.remove(analyticId);
    },
    updateAnalytic: function (analytic) {
        var id = analytic._id;

        Analytics.update({_id: id}, {
            $set: {
                date: analytic.date,
                modified: new Date(),
                cbc: analytic.cbc,
            }
        });
    }
});
