angular
    .module('Metis')
    .controller('SettingsCtrl', SettingsCtrl);

function SettingsCtrl ($scope,$meteor,$state) {

    $scope.hasIngredients = true;
    $scope.loadedIngredients = false;
    $scope.loading=false;

    $scope.checkIngredients = checkIngredients;
    $scope.loadIngredients = loadIngredients;

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
}