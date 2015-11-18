angular
.module('Metis')
.controller('ConsultationDetailsCtrl', ConsultationDetailsCtrl);

function ConsultationDetailsCtrl ($scope,$meteor,$state,$stateParams) {

  $scope.consultation = Consultations.findOne({_id:$stateParams.consultationId});

  $scope.updateConsultation = updateConsultation;

  function saveConsultation() {
    $meteor.call('updateConsultation', $scope.consultation).then(goToPatient);
  }

  function goToPatient() {
    return $state.go('app.patientDetails', {patientId: $scope.consultation.patientId});
  }

}
