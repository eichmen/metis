Meteor.publish("consultations", function (options, patientSelected) {

    Counts.publish(this, 'numberOfconsultations', Patients.find({
            $and:[
                {owner: this.userId},
                {owner: {$exists: true}},
                {patientId : patientSelected}
            ]
        }),
        { noReady: true });

    return Consultations.find({
        $and:[
            {owner: this.userId},
            {owner: {$exists: true}},
            {patientId : patientSelected}
        ]
},options);
});

Meteor.methods({
    insertConsultation: function (consultation) {
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        consultation.owner = Meteor.userId();
        Consultations.insert(consultation);
    },
    deleteConsultation: function (consultationId) {
        Consultations.remove(consultationId);
    },
    updateConsultation: function (consultation) {
      var id = consultation._id;
      delete consultation._id;

      Consultations.update({_id: id}, { $set: {
        observations: consultation.observations,
        date: consultation.date,
        modified: new Date()}
        });
      }
});
