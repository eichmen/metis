angular
    .module('Metis')
    .controller('PatientDetailsCtrl', PatientDetailsCtrl);

function PatientDetailsCtrl ($scope,$meteor,$state,$stateParams) {

    $scope.patient = $meteor.object(Patients, $stateParams.patientId,true);

    $scope.consultations = $meteor.collection(function() {
        return Consultations.find({"patientId" : $stateParams.patientId});
    });

    $scope.edit = false;

    /*$scope.consultations = [
        {
            date: '01/11/2015',
            observations: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sollicitudin quam a ' +
            'sollicitudin ornare. Nulla facilisi. Phasellus imperdiet convallis hendrerit.'
        },
        {
            date: '15/10/2015',
            observations: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sollicitudin quam a ' +
            'sollicitudin ornare. Nulla facilisi. Phasellus imperdiet convallis hendrerit.'
        },
        {
            date: '01/10/2015',
            observations: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sollicitudin quam a ' +
            'sollicitudin ornare. Nulla facilisi. Phasellus imperdiet convallis hendrerit.'
        }
    ];*/

    $scope.newConsultation = newConsultation;

    function newConsultation() {
        $state.go('app.addConsultation',{patientId: $stateParams.patientId});
    }

}