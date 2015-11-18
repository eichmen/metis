angular
.module('Metis')
.controller('AddConsultationCtrl', AddConsultationCtrl);

function AddConsultationCtrl ($scope,$meteor,$state,$stateParams,$mdDatePicker) {

  $scope.consultation = {};
  $scope.consultation.date = new Date();

  $scope.saveConsultation = saveConsultation;

/*  $scope.showPicker = showPicker;


  function showPicker(ev) {
    $mdDatePicker(ev, $scope.saveConsultation.date).then(function(selectedDate) {
      $scope.saveConsultation.date = selectedDate;
    });;
  }*/

  function saveConsultation() {
    $scope.consultation.patientId=$stateParams.patientId;
    $meteor.call('insertConsultation', $scope.consultation);
    $state.go('app.patientDetails', {patientId: $stateParams.patientId});
  }

}
