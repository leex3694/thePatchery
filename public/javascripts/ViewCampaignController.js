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
        //for(var i=0; i < $scope.campaignList.availableOptions.length;i++){
        //    if($scope.campaignList.availableOptions[i].testers[0].surveyResults != undefined){
        //        $scope.campaignList.selectedOption = $scope.campaignList.availableOptions[i];
        //        console.log( $scope.campaignList.selectedOption);
        //    }
        //};


        //Set to first available option
        // First option has to have a survey result or app will crash!!!!!!!!!!!!!!!!!!!!!!!!
        $scope.campaignList.selectedOption = $scope.campaignList.availableOptions[2];

        function generateData() {
            $scope.testerList = [];
            var tempTester = {};



            for(var volIt = 0; volIt < $scope.campaignList.selectedOption.testers[0].volunteer1.length; volIt++) {
                for (var surIt = 0; surIt < $scope.campaignList.selectedOption.testers[0].volunteer1.length; surIt++) {

                    console.log($scope.campaignList.selectedOption.testers[0].volunteer1[volIt].user[0].facebook.id);
                    console.log($scope.campaignList.selectedOption.testers[0].surveyResults[surIt].user[0].facebook.id);




                    if ($scope.campaignList.selectedOption.testers[0].volunteer1[volIt].user[0].facebook.id == $scope.campaignList.selectedOption.testers[0].surveyResults[surIt].user[0].facebook.id && $scope.campaignList.selectedOption.testers.length >= 1) {

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