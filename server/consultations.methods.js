Meteor.publish("consultations", function (patientSelected) {
    return Consultations.find({

        $and:[
            {owner: this.userId},
            {owner: {$exists: true}},
            {patientId : patientSelected}
        ]
});
});

Meteor.methods({
    insertConsultation: function (consultation) {

        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        consultation.owner = Meteor.userId();

        Consultations.insert(consultation);
    }

});