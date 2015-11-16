//var app = angular.module('UserSurveyApp', []);
var app = angular.module('UserSurveyApp', ['ngFileUpload']);

app.controller('SurveyController', ['$scope', '$http', '$location', 'Upload', function($scope, $http, $location, Upload){
    $scope.formData = {};

    $scope.submitSurveyForm = function(event){

        console.log($scope.formData);

        $scope.upload($scope.file);

        $location.path('/');
    };

    $scope.upload = function (file){
        var data = {file: file, formData: $scope.formData};
        console.log(data);
        Upload.upload({
            url: '/userSurvey/add',
            data: data
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });

    };


}]);







//var app = angular.module('UserSurveyApp', []);
//
//app.controller('userSurvey', ['$scope', '$http', function($scope, $http) {
//    $scope.formData = {};
//
//    $scope.submitSurveyForm = function(){
//
//        console.log($scope.formData);
//
//        var saveSurveyDataObj ={
//            //volunteerId: Schema.Types.ObjectId,      ************** Not sure how this is going to work. its from the schema ***********
//            question1: $scope.volunteerSurveyQ1,
//            question2: $scope.volunteerSurveyQ2,
//            question3: $scope.volunteerSurveyQ3,
//            question4a: $scope.formData.purchaseForm,
//            question4b: $scope.formData.recommended,
//            question5: $scope.volunteerSurveyQ5,
//            question6: $scope.volunteerSurveyQ6
//            //imgFront:
//            //imgBack:
//            //imgSide:
//        };
//
//        $http({
//            method: 'POST',
//            url: '/userSurvey/postSurveyResults',
//            data: saveSurveyDataObj
//        })
//
//    };
//
//}]);