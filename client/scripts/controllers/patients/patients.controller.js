angular
    .module('Metis')
    .controller('PatientsCtrl', PatientsCtrl);

function PatientsCtrl($scope, $meteor, $state) {

    $scope.search = "";

    $scope.patients = $meteor.collection(Patients).
      subscribe('patients',{},$scope.getReactively('search'));

    $scope.remove = remove;

    $scope.enter = enter;

    $scope.createPatient = createPatient;

    ////////////

    function remove(patient) {
        $scope.patients.remove(patient);
    }

    function enter(patient) {
        $state.go('app.patientDetails', {patientId: patient._id});
    }

    function createPatient() {
        $state.go('app.addPatient');
    }

}
