app.controller('ViewCampaignController', ['$scope', '$http', function($scope, $http){

////////////Start GET to generate the campaign names for the drop-down menus///////////////

    $scope.tempList = [];
    $scope.campaignList = [];
    $scope.testNameChosen = "";
    $scope.formData ={};



    $scope.accordion = {
        current: null
    };



    $http({method: 'GET', url: '/viewCampaigns/getCampaigns'}).then(function (response){

        $scope.tempList = response.data;
        $scope.campaignList.selectedOption = {};
        $scope.campaignList.availableOptions = [];
        console.log($scope.tempList);
        $scope.tempList.forEach(function(item){
            $scope.campaignList.availableOptions.push(item);
        });

        console.log("Available Options :",$scope.campaignList.availableOptions);



        //Set value of menu to first available option
        for(var i=0; i < $scope.campaignList.availableOptions.length;i++){
            if($scope.campaignList.availableOptions[i].testers[0].surveyResults == undefined) {
                console.log("No survey results");
            }else{
                $scope.campaignList.selectedOption = $scope.campaignList.availableOptions[i];
                console.log( $scope.campaignList.selectedOption);
            }
        };


        function generateData() {
            $scope.testerList = [];
            var tempTester = {};


            // Loop through the survey results and testers to match results to the right tester
            for(var volIt = 0; volIt < $scope.campaignList.selectedOption.testers[0].volunteer1.length; volIt++) {
                for (var surIt = 0; surIt < $scope.campaignList.selectedOption.testers[0].volunteer1.length; surIt++) {

                    console.log($scope.campaignList.selectedOption.testers[0].volunteer1[volIt].user[0].facebook.id);


                    //Testing for survey results
                    if($scope.campaignList.selectedOption.testers[0].surveyResults[surIt] == undefined){
                        console.log("value undefined");


                    //If Survey results are found then combine identifier to the results and push to testerList for display
                    }else if ($scope.campaignList.selectedOption.testers[0].volunteer1[volIt].user[0].facebook.id == $scope.campaignList.selectedOption.testers[0].surveyResults[surIt].user[0].facebook.id && $scope.campaignList.selectedOption.testers.length >= 1) {

                        var tempTester = {};

                        tempTester.volunteer1 = $scope.campaignList.selectedOption.testers[0].volunteer1[volIt];
                        tempTester.surveyResults = $scope.campaignList.selectedOption.testers[0].surveyResults[surIt];

                        console.log('tempTester', tempTester);

                        $scope.testerList.push(tempTester);

                    }

                }
            }
        }

        generateData();

        console.log('testerList', $scope.testerList);


            $scope.hasChanged = function(){
                generateData();
            };

    });

}]);