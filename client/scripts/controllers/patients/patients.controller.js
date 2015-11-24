angular
    .module('Metis')
    .controller('PatientsCtrl', PatientsCtrl);

function PatientsCtrl($scope, $meteor, $state,$mdDialog) {

    $scope.page = 1;
    $scope.perPage = 5;
    $scope.sort = {"name": 1};
    $scope.orderProperty = '1';

    $scope.filter = {
        options: {
            debounce: 500
        }
    };

    $scope.selected = [];

    $scope.search = "";


    $scope.patients = $meteor.collection(function () {
        return Patients.find({}, {
            sort: $scope.getReactively('sort')
        });
    });

    $scope.pageChanged = function (newPage) {
        $scope.page = newPage;
    };

    $scope.$watch('orderProperty', function () {
        if ($scope.orderProperty)
            $scope.sort = {name: parseInt($scope.orderProperty)};
    });

    $scope.$meteorAutorun(function () {

        $scope.$meteorSubscribe('patients', {
                limit: parseInt($scope.getReactively('perPage')),
                skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
                sort: $scope.getReactively('sort')
            },
            $scope.getReactively('search')).then(function () {
                $scope.patientsCount = $scope.$meteorObject(Counts, 'numberOfPatients', false);
                console.log($scope.patientsCount);
            });

    });

    $scope.remove = remove;
    $scope.deletePatients=deletePatients;

    $scope.enter = enter;

    $scope.createPatient = createPatient;

    ////////////

    function deletePatients() {
        angular.forEach($scope.selected, function(value, key) {
            $scope.patients.remove(value);
            });
    }

    function remove(patient) {
        $scope.patients.remove(patient);
    }

    function enter(patient) {
        $state.go('app.patientDetails', {patientId: patient._id});
    }

    function createPatient() {
        $state.go('app.addPatient');
    }

    $scope.showConfirm = function(ev) {

        var confirm = $mdDialog.confirm()
            .title('Would you like to delete these patients?')
            .textContent('All the information referred to these clients will be removed.')
            .ariaLabel('')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No! Sound really bad');
        $mdDialog.show(confirm).then(function() {
            deletePatients();
        }, function() {
            console.log("Ok, maybe later")
        });
    };

}
