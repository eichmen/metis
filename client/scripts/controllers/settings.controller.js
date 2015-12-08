angular
    .module('Metis')
    .controller('SettingsCtrl', SettingsCtrl);

function SettingsCtrl ($scope,$meteor,$state, gettextCatalog) {

    $scope.hasIngredients = true;
    $scope.loadedIngredients = false;
    $scope.loading=false;

    $scope.checkIngredients = checkIngredients;
    $scope.loadIngredients = loadIngredients;
    $scope.logout = logout;
    $scope.setLanguage = setLanguage;

    function checkIngredients() {
        $meteor.call('checkIngredients').then(
            function(data){
                console.log('success checking: ', data);
                $scope.hasIngredients = data;
                $scope.loadedIngredients = data;
            },
            function(err){
                console.log('failed', err);
            });
    }

    function loadIngredients() {
        $scope.loading=true;
        $meteor.call('loadIngredients').then(
            function(data){
                console.log('success checking: ', data);
                $scope.loading=false;
                $scope.loadedIngredients = data;
                $scope.hasIngredients = true;
            },
            function(err){
                $scope.loading=false;
                console.log('failed', err);
            });;
    }

    function setLanguage(language) {
        if(language === 'es') {
            console.log('Setting spanish');
            gettextCatalog.setCurrentLanguage('es_ES');
            Meteor.users.update({_id : Meteor.userId()}, {$set: {'profile.language': 'spanish'}});
        } else {
            console.log('Setting english');
            gettextCatalog.setCurrentLanguage('en_US');
            Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.language': 'english'}});
        }
    }

    function logout() {
        $meteor.logout();
        $state.go('login');
    }

}