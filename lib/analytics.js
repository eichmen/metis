Analytics = new Mongo.Collection('analytics');

Analytics.allow({
    insert: function (userId, analytic) {
        return userId && analytic.owner === userId;
    },
    update: function (userId, analytic, fields, modifier) {
        return userId && analytic.owner === userId;
    },
    remove: function (userId, analytic) {
        return userId && analytic.owner === userId;
    }
});

/*var schema = new SimpleSchema({
    owner: {
        type: String,
        label: "Owner of the analytic",
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    patientId : {
        type: String,
        label: "Identified of the patient",
        regEx: SimpleSchema.RegEx.Id
    },
    date: {
        type: Date,
        label: "Date of this analytic"
    }
});

Consultations.attachSchema(schema);*/
