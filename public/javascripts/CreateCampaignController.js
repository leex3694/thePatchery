/**
 * Created by usuario on 11/6/15.
 */
app.controller('CreateCampaignController', ['$scope', '$http', function($scope, $http){

    $scope.showNewCampaign = false;

// This is the submit button function for Creating a new Campaign. On this function everything that was input
// will be saved in the database, creating a new Campaign
    $scope.submitCreateSurveyData = function submitCreateSurveyData() {
        $scope.showNewCampaign = true;
        var createNameOfCampaign = $scope.createNameOfCampaign;
        var createStartSignUpDate = $scope.createStartSignUpDate;
        var createEndSignUpDate = $scope.createEndSignUpDate;
        var createStartSurveyDate = $scope.createStartSurveyDate;
        var createEndSurveyDate = $scope.createEndSurveyDate;

        var createCampaignObj = {
            campaignName: createNameOfCampaign,
            signupStart: createStartSignUpDate,
            signupEnd: createEndSignUpDate,
            surveyStart: createStartSurveyDate,
            surveyEnd: createEndSurveyDate
        };

        $http({
            method: 'POST',
            url: '/createCampaign/postCreateCampaignData',
            data: createCampaignObj
        }).then(function () {
            $http({
                method: 'GET',
                url: '/createCampaign/getCreatedCampaign'
            }).then(function (response) {
                var res = response.data;

                $scope.resultedCampaignTitle = (res[res.length - 1].campaignName);
                $scope.resultedCampaignStartSignUp = (res[res.length - 1].signupStart);
                $scope.resultedCampaignEndSignUp = (res[res.length - 1].signupEnd);
                $scope.resultedCampaignStartSurvey = (res[res.length - 1].surveyStart);
                $scope.resultedCampaignEndSurvey = (res[res.length - 1].surveyEnd);
            });
        });

    };




}]);