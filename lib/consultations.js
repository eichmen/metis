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