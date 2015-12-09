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

    $scope.selected = [];

    $scope.query = {
        page: 1,
        perPage: 5,
        order: 'date',
        orderProperty: 1,
        search: '',
        sort: {
            'date' : 1
        },
        group: ''
    }

    $scope.pageChanged = function(newPage) {
        $scope.query.page = newPage;
    };

    $scope.onOrderChange = function(order) {
        var sort = {};
        if(order.startsWith('-')) {
            sort[order.substr(1)] = -1
        } else {
            sort[order] = 1
        }
        $scope.query.sort = sort;
    };

    $scope.$watch('query.search', function() {
        $scope.query.page = 1;
    });

    $scope.genderList=['','Man','Woman'];

    $scope.$meteorSubscribe('patients', {},{});

    $scope.patient = $scope.$meteorObject
    (Patients, $stateParams.patientId,false);

    $scope.consultations = $meteor.collection(function() {
        return Consultations.find({}, {
            sort : $scope.getReactively('query.sort')
        });
    });

    $scope.$meteorAutorun(function() {
        $scope.$meteorSubscribe('consultations', {
                limit: parseInt($scope.getReactively('query.perPage')),
                skip: (parseInt($scope.getReactively('query.page')) - 1) * parseInt($scope.getReactively('query.perPage')),
                sort: $scope.getReactively('query.sort'),
                fields: {
                    'date' : 1,
                    'observations': 1,
                  }
            },$stateParams.patientId).then(function(){
                $scope.consultCount = $scope.$meteorObject(Counts ,'numberOfConsultations', false);
                console.log($scope.consultCount);
            });
    });



    /* $scope.$meteorSubscribe method will automatically close the subscription
     when the scope gets destroyed
     *  $meteor.subscribe does not destroy the scope so consultations are not
     cleaned after page transition
     * */
   /* $scope.$meteorSubscribe('consultations',{},$stateParams.patientId)
        .then(function(subscriptionHandle){
            $scope.consultations = $meteor.collection(Consultations);
            console.log($scope.consultations + ' is ready');
        });*/

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
