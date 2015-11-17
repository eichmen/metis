Meteor.publish("consultations", function () {
    return Consultations.find({

        $and:[
            {owner: this.userId},
            {owner: {$exists: true}}
        ]

});
});