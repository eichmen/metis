Meteor.startup(function () {

        Patients.remove({});
        Consultations.remove({});

        if (Accounts.findUserByEmail('metis@metis.com') == null) {
            Accounts.createUser({
                username: 'metis',
                email: 'metis@metis.com',
                password: 'metis',
                profile: {
                    name: 'Metis'
                }
            });
        }

        var metis = Accounts.findUserByEmail('metis@metis.com');

        if (Patients.find().count() === 0) {

            var patients = [
                {
                    name: 'Allen B. Lopez',
                    birthdate: new Date(1984, 0, 2),
                    location: 'Madrid',
                    photo: 'https://deaenij3kiw8r.cloudfront.net/system/users/avatars/141380/original/production-b3612f96cc66fee631be82853dd2c316-man_bartlett_bw.jpg?1369799811',
                    public: true
                },
                {
                    name: 'Laura B. Red',
                    birthdate: new Date(1984, 2, 22),
                    location: 'Madrid',
                    photo: 'https://meets.com/images/default-avatar.png',
                    owner : metis._id
                },
                {
                    name: 'Pepe B. Brown',
                    birthdate: new Date(1984, 7, 12),
                    location: 'Dallas',
                    photo: 'https://meets.com/images/default-avatar.png',
                    owner : metis._id
                },
                {
                    name: 'Robert Drill',
                    birthdate: new Date(1980, 7, 12),
                    location: 'Boston',
                    photo: 'https://meets.com/images/default-avatar.png',
                    owner : metis._id
                },
            ];

            patients.forEach(patient => {
                Patients.insert(patient);
        }
        )
        ;


        var consultations = [
            {
                date: new Date(2015, 10, 1),
                observations: 'Consultation 1',
                owner : metis._id
            },
            {
                date: new Date(2015, 9, 15),
                observations: 'Consultation 2',
                owner : metis._id
            },
            {
                date: new Date(2015, 9, 1),
                observations: 'Consultation 3',
                owner : metis._id
            }
        ];

        Patients.find({}).forEach(patient => {
            consultations.forEach(consultation => {
            consultation.observations+=" "+patient.name,
            consultation.patientId = patient._id;
        Consultations.insert(consultation);
    }
)
})
;

}
})
;