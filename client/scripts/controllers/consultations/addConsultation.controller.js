angular
.module('Metis')
.controller('AddConsultationCtrl', AddConsultationCtrl);

function AddConsultationCtrl ($scope,$meteor,$state,$stateParams,$mdDatePicker) {

  $scope.consultation = {};
  $scope.consultation.date = new Date();

  $scope.saveConsultation = saveConsultation;

  function saveConsultation() {
    $scope.consultation.patientId=$stateParams.patientId;
    $meteor.call('insertConsultation', $scope.consultation);
    $state.go('app.patientDetails', {patientId: $stateParams.patientId});
  }

}
