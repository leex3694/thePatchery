/**
 * Created by usuario on 11/6/15.
 */
app.controller('CreateCampaignController', ['$scope', '$http', function($scope, $http){

    $scope.showNewCampaign = false;


// This is the submit button function for Creating a new Campaign. On this function everything that was input
// will be saved in the database, creating a new Campaign
    $scope.submitCreateSurveyData = function submitCreateSurveyData() {

    //These are the variables for what is input in the inputs on the Create Campaign screen
        var createNameOfCampaign = $scope.createNameOfCampaign;
        var createStartSignUpDate = $scope.createStartSignUpDate;
        var createEndSignUpDate = $scope.createEndSignUpDate;
        var createStartSurveyDate = $scope.createStartSurveyDate;
        var createEndSurveyDate = $scope.createEndSurveyDate;
        var createCampaignObj = {};


        verifyDates();  //funciton to verify end dates are after start dates



        //This function makes sure that the end dates are after start dates. If end date is before
        //  start date then it will cancel the submit until the dates are correct.
        function verifyDates() {
            if(createEndSignUpDate < createStartSignUpDate){
                alert('End Date must be after Start date');
                return console.log("end date before start")
            }
            if(createEndSurveyDate < createStartSurveyDate){
                alert('End Date must be after Start date');
                return console.log("end date before start")
            }

            //This is the object for the schema that gets sent once everything is valid
            createCampaignObj = {
                campaignName: createNameOfCampaign,
                signupStart: createStartSignUpDate,
                signupEnd: createEndSignUpDate,
                surveyStart: createStartSurveyDate,
                surveyEnd: createEndSurveyDate
            };
            postAndGetCreateCampaign(); //Once all inputs are valid, the data will POST and GET the data
            $scope.showNewCampaign = true;
        }


        //The POST and GET for the inputs on Create Campaign
        function postAndGetCreateCampaign(){
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
        }

    };




}]);