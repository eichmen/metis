angular
.module('Metis')
.controller('AddConsultationCtrl', AddConsultationCtrl);

function AddConsultationCtrl ($scope,$meteor,$state,$stateParams,$mdDatePicker) {

  $scope.newConsultation = {};
  $scope.newConsultation.date = new Date();

  $scope.saveConsultation = saveConsultation;

/*  $scope.showPicker = showPicker;


  function showPicker(ev) {
    $mdDatePicker(ev, $scope.saveConsultation.date).then(function(selectedDate) {
      $scope.saveConsultation.date = selectedDate;
    });;
  }*/

  function saveConsultation() {
    $scope.newConsultation.patientId=$stateParams.patientId;
    $meteor.call('insertConsultation', $scope.newConsultation);
    $state.go('app.patientDetails', {patientId: $stateParams.patientId});
  }

}
