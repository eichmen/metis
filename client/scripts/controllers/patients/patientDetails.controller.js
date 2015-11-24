angular
    .module('Metis')
    .controller('PatientDetailsCtrl', PatientDetailsCtrl);

function PatientDetailsCtrl ($scope,$meteor,$state,$stateParams) {

    $scope.$meteorSubscribe('patients', {},{});

    $scope.patient = $scope.$meteorObject
    (Patients, $stateParams.patientId);

    /* $scope.$meteorSubscribe method will automatically close the subscription
     when the scope gets destroyed
    *  $meteor.subscribe does not destroy the scope so consultations are not
    cleaned after page transition
    * */
    $scope.$meteorSubscribe('consultations',{},$stateParams.patientId)
      .then(function(subscriptionHandle){
        $scope.consultations = $meteor.collection(Consultations);
        console.log($scope.consultations + ' is ready');
    });

    $scope.edit = false;

    $scope.newConsultation = newConsultation;
    $scope.deleteConsultation = deleteConsultation;
    $scope.editConsultation = editConsultation;

    function newConsultation() {
        $state.go('app.addConsultation',{patientId: $stateParams.patientId});
    }

    function deleteConsultation(consultationId) {
      $meteor.call('deleteConsultation', consultationId);
    }

    function editConsultation(consultationId) {
        $state.go('app.consultationDetails',{consultationId: consultationId});
    }
}
