/**
 * Created by usuario on 11/6/15.
 */
app.controller('CreateCampaignController', ['$scope', '$http', function($scope, $http){

    $scope.submitCreateSurveyData = function submitCreateSurveyData(){
        var createNameOfCampaign= $scope.createNameOfCampaign;
        var createStartSignUpDate = $scope.createStartSignUpDate;
        var createEndSignUpDate = $scope.createEndSignUpDate;
        var createStartSurveyDate = $scope.createStartSurveyDate;
        var createEndSurveyDate = $scope.createEndSurveyDate;

        var createCampaignObj = {
            nameOfCampaign: createNameOfCampaign,
            startSignUpDate: createStartSignUpDate,
            endSignupDate: createEndSignUpDate,
            startSurveyDate: createStartSurveyDate,
            endSurveyDate: createEndSurveyDate
        };
        $http({
            method: 'POST',
            url: '/createCampaign/postCreateCampaignData',
            data: createCampaignObj
        });





    }



}]);