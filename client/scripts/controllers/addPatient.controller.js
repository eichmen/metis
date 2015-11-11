angular
    .module('Metis')
    .controller('AddPatientCtrl', AddPatientCtrl);

function AddPatientCtrl ($scope,$meteor,$state) {

    $scope.newPatient = {};

    $scope.patients = $meteor.collection(Patients);

    $scope.savePatient = savePatient;


    function savePatient() {
        $scope.patients.push($scope.newPatient);
        $scope.newPatient = {};
        $state.go('app.patients');

    }
}