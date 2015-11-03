Meteor.startup(function () {

        Patients.remove({});
        Consultations.remove({});

    if (Patients.find().count() === 0) {

        var patients = [
            {
                name: 'Allen B. Lopez',
                birthdate: new Date(1984, 0, 2),
                location: 'Madrid',
                photo: 'https://deaenij3kiw8r.cloudfront.net/system/users/avatars/141380/original/production-b3612f96cc66fee631be82853dd2c316-man_bartlett_bw.jpg?1369799811'
            },
            {
                name: 'Laura B. Red',
                birthdate: new Date(1984, 2, 22),
                location: 'Madrid',
                photo: 'https://meets.com/images/default-avatar.png'
            },
            {
                name: 'Pepe B. Brown',
                birthdate: new Date(1984, 7, 12),
                location: 'Dallas',
                photo: 'https://meets.com/images/default-avatar.png'
            },
            {
                name: 'Robert Drill',
                birthdate: new Date(1980, 7, 12),
                location: 'Boston',
                photo: 'https://meets.com/images/default-avatar.png'
            },
        ];

        patients.forEach(patient => {
            Patients.insert(patient);
        });


        var consultations = [
            {
                date: new Date(2015,10,1),
                observations: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sollicitudin quam a ' +
                'sollicitudin ornare. Nulla facilisi. Phasellus imperdiet convallis hendrerit.'
            },
            {
                date: new Date(2015,9,15),
                observations: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sollicitudin quam a ' +
                'sollicitudin ornare. Nulla facilisi. Phasellus imperdiet convallis hendrerit.'
            },
            {
                date: new Date(2015,9,1),
                observations: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sollicitudin quam a ' +
                'sollicitudin ornare. Nulla facilisi. Phasellus imperdiet convallis hendrerit.'
            }
        ];

        Patients.find({}).forEach(patient => {
            consultations.forEach(consultation => {
            consultation.patientId = patient._id;
                Consultations.insert(consultation);
            }
            )
        });

}
})
;