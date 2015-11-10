var sign = angular.module('sign', []);

sign.controller('SignUpController', ['$scope','$http', function($scope, $http){
    $scope.sendSignUpForm = function (){
        console.log("somehting");
        var sendSignUpData = {
            name: $scope.name,
            street: $scope.street,
            city: $scope.city,
            state: $scope.state,
            zip: $scope.zip,
            email: $scope.email,
            gender: $scope.gender,
            size: $scope.size,
            sizeQualifying: $scope.sizeQualifying
        };
        console.log(sendSignUpData);
        $http.post('/signUp/volunteersData', sendSignUpData).then(function(response){

        });
    }
}]);