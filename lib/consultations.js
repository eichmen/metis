Consultations = new Mongo.Collection('consultations');

Consultations.allow({
    insert: function (userId, consultation) {
        return userId && consultation.owner === userId;
    },
    update: function (userId, consultation, fields, modifier) {
        return userId && consultation.owner === userId;
    },
    remove: function (userId, consultation) {
        return userId && consultation.owner === userId;
    }
});

var schema = new SimpleSchema({
    owner: {
        type: String,
        label: "Owner of the consultation",
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
        label: "Date of this consultation"
    },
    observations: {
        type: String,
        label: "Observations",
        optional: true,
        max: 300
    }
});

Consultations.attachSchema(schema);
