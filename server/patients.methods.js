Meteor.publish("patients", function (options,searchString) {
    if (searchString == null) {
        searchString = '';
    }

    if (options == null || options.limit == null || options.limit > 15) {
        console.log(options);
        options.limit=8;
    }

    Counts.publish(this, 'numberOfPatients', Patients.find({
        'name' : { '$regex' : '.*' + searchString ||
        '' + '.*', '$options' : 'i' }}),
        { noReady: true });

    return Patients.find({
        'name' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
        $or: [
            {
                $and: [
                    {"public": true},
                    {"public": {$exists: true}}
                ]
            },
            {
                $and: [
                    {owner: this.userId},
                    {owner: {$exists: true}}
                ]
            }
        ]
    },options);
});

Meteor.publish("patient-details", function (idToSearch) {
    return Patients.find({
        '_id' : idToSearch
    });
});

Meteor.methods({

    updatePatientGeneral: function (patient) {
        // Make sure the user is logged in before inserting a task
        console.log('[server] updatePatientGeneral');
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        if (!patient.owner) {
            patient.owner = Meteor.userId();
        }
        console.log('[server] pre updatePatientGeneral');
        console.log(patient)
        var id = patient._id;

        if (id) {
            Patients.update({_id: id}, {
                $set: {
                    name: patient.name,
                    lastname: patient.lastname,
                    gender: patient.gender,
                    birthdate: patient.birthdate,
                    phone: patient.phone,
                    email: patient.email,
                    owner: patient.owner,
                    children: patient.children,
                    workShift: patient.workShift,
                    profession: patient.profession,
                    workType: patient.workType,
                    generalHabits: {
                        smoker: patient.generalHabits.smoker,
                        physicalActivity: patient.generalHabits.physicalActivity,
                        pregnant: patient.generalHabits.pregnant,
                        breadFeed: patient.generalHabits.breadFeed,
                        tired: patient.generalHabits.tired,
                        sleepHours: patient.generalHabits.sleepHours
                    },
                    alimentaryHabits: {
                        eatOutNumber: patient.alimentaryHabits.eatOutNumber,
                        eatOutResume: patient.alimentaryHabits.eatOutResume,
                        tupperNumber: patient.alimentaryHabits.tupperNumber,
                        tupperResume: patient.alimentaryHabits.tupperResume,
                        numberPeopleYouCook: patient.alimentaryHabits.numberPeopleYouCook,
                        snackingState: patient.alimentaryHabits.snackingState,
                        waterState: patient.alimentaryHabits.waterState,
                        alcoholState: patient.alimentaryHabits.alcoholState,
                        fridge: patient.alimentaryHabits.fridge,
                        microwave: patient.alimentaryHabits.microwave,
                        cook: patient.alimentaryHabits.cook,
                        shop: patient.alimentaryHabits.shop,
                        sugarDrinks: patient.alimentaryHabits.sugarDrinks,
                        wholeGrain: patient.alimentaryHabits.wholeGrain,
                        fast: patient.alimentaryHabits.fast,
                    },
                    anthropometric: {
                        weight: patient.anthropometric.weight,
                        height: patient.anthropometric.height,
                        imc: patient.anthropometric.imc,
                        totalFat: patient.anthropometric.totalFat,
                        visceralFat: patient.anthropometric.visceralFat,
                        water: patient.anthropometric.water,
                        muscle: patient.anthropometric.muscle,
                        bmr: patient.anthropometric.bmr,
                        energy: patient.anthropometric.energy,
                        waist: patient.anthropometric.waist,
                        hip: patient.anthropometric.hip,
                        waistHipIndex: patient.anthropometric.waistHipIndex,
                        thigh: patient.anthropometric.thigh,
                        chest: patient.anthropometric.chest,
                        wrist: patient.anthropometric.wrist,
                        nondominantArm: patient.anthropometric.nondominantArm
                    }
                }
            });
        } else {
            patient.registerDate= new Date();
            Patients.insert(patient);
        }
    }



});
