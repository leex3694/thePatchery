/**
 * Created by usuario on 11/4/15.
 */
app.controller('HomeController', ['$scope', '$location', function($scope, $location){

    $scope.currentPath = $location.path();

    $scope.isHome = function($location){
        if ($location === currentPath)
            return true;
        else
            return false;
    };

}]);