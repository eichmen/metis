angular
    .module('Metis')
    .controller('PatientDetailsCtrl', PatientDetailsCtrl);

function PatientDetailsCtrl ($scope,$meteor,$state,$stateParams) {


    $scope.patient = $meteor.object(Patients, $stateParams.patientId).subscribe('patients');
    $scope.consultations = $meteor.collection(Consultations).subscribe('consultations',$stateParams.patientId);

    $scope.edit = false;

    $scope.newConsultation = newConsultation;

    function newConsultation() {
        $state.go('app.addConsultation',{patientId: $stateParams.patientId});
    }

}