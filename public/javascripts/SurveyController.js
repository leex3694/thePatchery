//var app = angular.module('UserSurveyApp', []);
var app = angular.module('UserSurveyApp', ['ngFileUpload']);

app.controller('SurveyController', ['$scope', '$http', '$location', 'Upload', function($scope, $http, $location, Upload){
    $scope.formData = {};


    $scope.submitSurvey = function(isValid) {

        //check to make sure the form is completely valid
        //if (isValid) {
        //    alert('Congrats! You\'ve successfully submitted the survey.');
        //}
        if (window.confirm('Thank You! You\'ve successfully submitted the survey' )){
            window.location.href='https://www.facebook.com/groups/thepatchery/';
        }
    };

    $scope.submitSurveyForm = function(event){



            console.log('this is form data ', $scope.formData);

            $scope.upload($scope.file);

            $location.path('/');
    };



    $scope.tempList = [];
    $scope.campaignList = [];
    $scope.testNameChosen = "";
    $scope.formData ={};

    $scope.accordion = {
        current: null
    };

    $http({method: 'GET', url: '/viewCampaigns/getCampaigns'}).then(function (response) {

        $scope.tempList = response.data;
        $scope.campaignList.selectedOption = {};
        $scope.campaignList.availableOptions = [];
        $scope.tempList.forEach(function (item) {
            $scope.campaignList.availableOptions.push(item);
            //console.log($scope.campaignList.availableOptions(item));
        });
        console.log('this is templist ', $scope.tempList);

        //Set to first available option
        $scope.campaignList.selectedOption = $scope.campaignList.availableOptions[$scope.campaignList.availableOptions.length - 1];
        console.log('selected option ', $scope.campaignList.selectedOption);
        $scope.testerList = [];

        if ($scope.campaignList.selectedOption.testers.length > 1) {
            //Possibly re-work model to be Mixed (Object) vs ArrayList
            var testers = $scope.campaignList.selectedOption.testers[0].volunteer1;

            console.log(testers);

            console.log('these are the testers now');
            console.log(testers);
            for (var i = 0; i < testers.length; i++) {
                $scope.testerList.push(testers[i]);
                console.log('testerList');
                console.log($scope.testerList);
            }
        }
    });



    $scope.upload = function (file){
        var data = {file: file, formData: $scope.formData, campaignName: $scope.campaignList.selectedOption.campaignName};
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