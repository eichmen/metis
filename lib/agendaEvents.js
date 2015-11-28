AgendaEvents = new Mongo.Collection('agendaEvents');

AgendaEvents.allow({
    insert: function (userId, agendaEvent) {
        return userId && agendaEvent.owner === userId;
    },
    update: function (userId, agendaEvent, fields, modifier) {
        return userId && agendaEvent.owner === userId;
    },
    remove: function (userId, agendaEvent) {
        return userId && agendaEvent.owner === userId;
    }
});

