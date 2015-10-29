angular
    .module('Metis')
    .controller('PatientDetailsCtrl', PatientDetailsCtrl);

function PatientDetailsCtrl ($scope,$meteor,$stateParams) {

    $scope.patient = $meteor.object(Patients, $stateParams.patientId);


    console.log($scope.patient);
}