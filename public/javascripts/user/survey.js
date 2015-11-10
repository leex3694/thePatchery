/**
 * Created by usuario on 11/9/15.
 */
var app = angular.module('UserSurveyApp', []);

app.controller('userSurvey', ['$scope', '$http', function($scope, $http) {
    $scope.formData = {};

    $scope.submitSurveyForm = function(){

        console.log($scope.formData);



        var saveSurveyDataObj ={
            //volunteerId: Schema.Types.ObjectId,      ************** Not sure how this is going to work. its from the schema ***********
            question1: $scope.volunteerSurveyQ1,
            question2: $scope.volunteerSurveyQ2,
            question3: $scope.volunteerSurveyQ3,
            question4a: $scope.formData.purchaseForm,
            question4b: $scope.formData.recommended,
            question5: $scope.volunteerSurveyQ5,
            question6: $scope.volunteerSurveyQ6
            //imgFront:
            //imgBack:
            //imgSide:
        };


        $http({
            method: 'POST',
            url: '/userSurvey/postSurveyResults',
            data: saveSurveyDataObj
        })



    };

}]);
