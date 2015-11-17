Patients = new Mongo.Collection('patients');

Patients.allow({
    insert: function (userId, patient) {
        return userId && patient.owner === userId;
    },
    update: function (userId, patient, fields, modifier) {
        return userId && patient.owner === userId;
    },
    remove: function (userId, patient) {
        return userId && patient.owner === userId;
    }
});