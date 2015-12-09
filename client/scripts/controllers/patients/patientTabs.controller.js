angular
    .module('Metis')
    .controller('PatientTabsCtrl', PatientTabsCtrl);

function PatientTabsCtrl ($scope,$meteor,$state,$stateParams,$mdDialog) {

    $scope.isOpen = false;
    $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
    };

    $scope.genderList=['','Man','Woman'];

    $scope.$meteorSubscribe('patients', {},{});

    $scope.patient = $scope.$meteorObject
    (Patients, $stateParams.patientId,false);

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

    $scope.selectedTab = 0;

    $scope.newConsultation = newConsultation;
    $scope.deleteConsultation = deleteConsultation;
    $scope.editConsultation = editConsultation;
    $scope.updatePatientGeneral = updatePatientGeneral;

    function updatePatientGeneral() {
        $meteor.call('updatePatientGeneral', $scope.patient.getRawObject()).then(showAlert('Update','General information updated!'));
    }

    function newConsultation() {
        $state.go('app.addConsultation',{patientId: $stateParams.patientId});
    }

    function deleteConsultation(consultationId) {
        $meteor.call('deleteConsultation', consultationId);
    }

    function editConsultation(consultationId) {
        $state.go('app.consultationDetails',{consultationId: consultationId});
    }

    function showAlert(title,text) {
      alert = $mdDialog.alert({
        title: title,
        content: text,
        ok: 'Close'
      });
      $mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
        });
    }
}
