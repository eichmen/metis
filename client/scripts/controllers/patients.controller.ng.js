angular
    .module('Metis')
    .controller('PatientsCtrl', PatientsCtrl);

function PatientsCtrl ($scope,$meteor,$state) {

    //$scope.patients = $scope.$meteorCollection(Patients);
    $scope.patients = $meteor.collection(function() {
        return Patients.find({});
    });
    console.log($scope.patients);
    $scope.remove = remove;

    $scope.enter = enter;
    ////////////

    function remove (patient) {
        $scope.patients.remove(patient);
    }

    function enter(patient) {
        $state.go('patientDetails',{patientId: patient._id});
    }

}