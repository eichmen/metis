angular
    .module('Metis')
    .controller('AddConsultationCtrl', AddConsultationCtrl);

function AddConsultationCtrl ($scope,$meteor,$state,$stateParams) {

    $scope.newConsultation = {};

    $scope.consultations = $meteor.collection(Consultations);

    $scope.saveConsultation = saveConsultation;

    function saveConsultation() {
        $scope.newConsultation.patientId=$stateParams.patientId;
        $meteor.call('insertConsultation', $scope.newConsultation);
        $state.go('app.patients');
    }


}