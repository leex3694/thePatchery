var sign = angular.module('sign', []);

sign.controller('SignUpController', ['$scope','$http', function($scope, $http){


    $scope.campaignList = [];

    $scope.testNameChosen = "";
    $scope.faceButtonShow = true;
    $scope.signUpForm = true;

    $scope.submitForm = function(isValid) {

        // check to make sure the form is completely valid
        if (isValid) {
            alert('Congrats! You\'ve successfully submitted the survey.');
        }
    };

    $http({
        method: 'GET',
        url: '/makeList/getVolunteers'
    }).then(function (response){

        $scope.tempList = response.data;
        $scope.campaignList.selectedOption = {};
        $scope.campaignList.availableOptions = [];
        $scope.tempList.forEach(function(item){
            $scope.campaignList.availableOptions.push(item);
        });
        //Sets to first available option
        $scope.campaignList.selectedOption = $scope.campaignList.availableOptions[$scope.campaignList.availableOptions.length - 1];

        console.log($scope.campaignList);
        console.log($scope.campaignList.length);
    });

    $scope.formData ={};

    $scope.sendSignUpForm = function (isValid){


        var sendSignUpData = {
            name: $scope.name,
            street: $scope.street,
            city: $scope.city,
            state: $scope.state,
            zip: $scope.zip,
            email: $scope.email,
            gender: $scope.gender,
            size: $scope.size,
            sizeQualifying: $scope.sizeQualifying,
            campaignSelect: $scope.campaignSelect

        };
        console.log(sendSignUpData);

        alert('Thank you for signing up!');


        // This clears out the form on submission
        $scope.name = "";
        $scope.street = "";
        $scope.city = "";
        $scope.state = "";
        $scope.zip = "";
        $scope.email = "";
        $scope.gender = "";
        $scope.size = "";
        $scope.sizeQualifying = "";
        $scope.campaignSelect = "";



        $http.post('/signUp/volunteersData', sendSignUpData).then(function(response){

        });
    }
}]);