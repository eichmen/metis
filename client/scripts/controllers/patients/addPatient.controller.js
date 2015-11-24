angular
    .module('Metis')
    .controller('AddPatientCtrl', AddPatientCtrl);

function AddPatientCtrl ($scope,$meteor,$state) {

    $scope.newPatient = {};

    $scope.savePatient = savePatient;


    function savePatient() {
        $scope.newPatient.owner = Meteor.userId(),
        $scope.newPatient.photo="resources/default-avatar.png";
        Patients.insert($scope.newPatient);
        $scope.newPatient = {};
        $state.go('app.patients');

    }
}
