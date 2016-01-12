Meteor.startup(function () {

   createIndexesMongoDB();

    Patients.remove({});
    Consultations.remove({});
    AgendaEvents.remove({});

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
                name: 'Allen',
                lastname: 'Lopez Fernandez',
                gender: 'Man',
                birthdate: new Date(1984, 0, 2),
                location: 'Madrid',
                phone: 666666666,
                owner: metis._id,
                photo: 'resources/dummy/allen.jpg',
                email: 'allen@allen.com',
                registerDate: new Date()
            },
            {
                name: 'Laura',
                lastname: 'Lena Pérez',
                birthdate: new Date(1984, 2, 22),
                location: 'Madrid',
                phone: 666666666,
                gender: 'Woman',
                photo: 'resources/dummy/laura.jpg',
                owner: metis._id,
                email: 'laura@laura.com',
                registerDate: new Date()
            },
            {
                name: 'Pepe',
                lastname: 'García Rico',
                gender: 'Man',
                birthdate: new Date(1984, 7, 12),
                location: 'Barcelona',
                phone: 666666666,
                photo: 'resources/dummy/pepe.jpg',
                owner: metis._id,
                email: 'pepe@pepe.com',
                registerDate: new Date()
            },
            {
                name: 'Robert',
                lastname: 'Lee',
                gender: 'Man',
                birthdate: new Date(1980, 7, 12),
                location: 'Boston',
                phone: 666666666,
                photo: 'resources/dummy/rober.jpg',
                owner: metis._id,
                email: 'robert@rober.com',
                registerDate: new Date()

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
                owner: metis._id
            },
            {
                date: new Date(2015, 9, 15),
                observations: 'Consultation 2',
                owner: metis._id
            },
            {
                date: new Date(2015, 9, 1),
                observations: 'Consultation 3',
                owner: metis._id
            }
        ];

        Patients.find({}).forEach(patient => {
            consultations.forEach(consultation => {
                if (patient!=null && patient._id!=null) {
                    consultation.patientId = patient._id;
                    Consultations.insert(consultation);
                }
            })
        });


        var agendaEvents = [
            {
                start: new Date(2015, 11, 1, 11, 30, 0, 0),
                end: new Date(2015, 11, 1, 12, 00, 0, 0),
                owner: metis._id,
                title: 'Robert Drill',
                patientId: Patients.findOne({name: 'Allen'})._id,
                stick: true
            },

            {
                start: new Date(2015, 11, 2, 9, 30, 0, 0),
                end: new Date(2015, 11, 2, 10, 00, 0, 0),
                owner: metis._id,
                title: 'Pepe B. Brown',
                patientId: Patients.findOne({name: 'Robert'})._id,
                stick: true
            }
        ]

        agendaEvents.forEach(agendaEvent => {
            AgendaEvents.insert(agendaEvent);
        });

    }

    if(Recipes.find().count() === 0) {

        var recipes = [
            {
                fundamentals : {
                    numberOfServings : 2,
                    preparationTimeMinutes : 15,
                    rating : 5,
                    tags : [
                        'SPANISH', 'EGGS', 'OMELETTES'
                    ]
                },
                nomenclature : {

                    english : {
                        name : 'SPANISH OMELETTE',
                        desc: 'As simple as it can be..., in each spanish family you will find the omelet tastes different!',
                        steps : [
                            { number: 1, desc: "Scrape the potatoes. Cut them into thick slices. Chop the onion."},
                            { number: 2, desc: "Heat the oil in a large frying pan, add the potatoes and onion and stew gently, partially covered, for 30 minutes, stirring occasionally until the potatoes are softened. Strain the potatoes and onions through a colander into a large bowl (set the strained oil aside)"},
                            { number: 3, desc: "Beat the eggs separately, then stir into the potatoes with the parsley and plenty of salt and pepper. Heat a little of the strained oil in a smaller pan. Tip everything into the pan and cook on a moderate heat, using a spatula to shape the omelette into a cushion"},
                            { number: 4, desc: "When almost set, invert on a plate and slide back into the pan and cook a few more minutes. Invert twice more, cooking the omelette briefly each time and pressing the edges to keep the cushion shape. Slide on to a plate and cool for 10 minutes before serving."}
                        ]
                    },
                    spanish : {

                    }
                },
                ingredients : [
                    { id: 1231, unit: 'grams', amount: 500},
                    { id: 1234, unit: 'grams', amount: 150},
                    { id: 1235, unit: 'ml', amount: 150},
                    { id: 1236, unit: 'units', amount: 6},
                    { id: 1237, unit: 'x', amount: 0}
                ],
                nutrition : {
                    energy: { unit: 'kcal', amount: 516},
                    fat: { unit: 'grams', amount: 43},
                    saturates: { unit: 'grams', amount: 7},
                    protein: {unit: 'grams', amount: 12},
                    carbs: {unit: 'grams', amount: 23},
                    sugars: {unit: 'grams', amount: 0},
                    salt: {unit: 'grams', amount: 0.31}
                }
            }
        ]

        recipes.forEach(recipe => {
                Recipes.insert(recipe);
            }
        )
        ;

    }

})
;

function createIndexesMongoDB() {
    //Ingredients collection
    Ingredients._ensureIndex({'nomenclature.english.shrtDesc': 1});
    Ingredients._ensureIndex({'nomenclature.english.desc': 1});
    Ingredients._ensureIndex({'nomenclature.spanish.desc': 1});
    Ingredients._ensureIndex({'nomenclature.english.foodGroup': 1});
    Ingredients._ensureIndex({'proximates.energKcal.value': 1});
    Ingredients._ensureIndex({'proximates.protein.value': 1});
    Ingredients._ensureIndex({'proximates.lipidTot.value': 1});
    Ingredients._ensureIndex({'proximates.carbohydrt.value': 1});
}