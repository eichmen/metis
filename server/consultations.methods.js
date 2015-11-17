Meteor.publish("consultations", function (patientSelected) {
    return Consultations.find({

        $and:[
            {owner: this.userId},
            {owner: {$exists: true}},
            {patientId : patientSelected}
        ]

});
});