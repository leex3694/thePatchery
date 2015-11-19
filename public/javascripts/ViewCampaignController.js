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

        //Set to first available option
        $scope.campaignList.selectedOption = $scope.campaignList.availableOptions[$scope.campaignList.availableOptions.length - 1];

        function generateData() {
            $scope.testerList = [];

            console.log( "length of tester array ", $scope.campaignList.selectedOption.testers[0].volunteer1.length);
            //if($scope.campaignList.selectedOption.testers.length >= 1){

            for(var volIt = 0; volIt < $scope.campaignList.selectedOption.testers[0].volunteer1.length; volIt++) {
                for (var surIt = 0; surIt < $scope.campaignList.selectedOption.testers[0].volunteer1.length; surIt++) {


                    if ($scope.campaignList.selectedOption.testers[0].volunteer1[volIt].user[0].facebook.id == $scope.campaignList.selectedOption.testers[0].surveyResults[surIt].user[0].facebook.id && $scope.campaignList.selectedOption.testers.length >= 1) {

                        //console.log("survey results id ", $scope.campaignList.selectedOption.testers[0].surveyResults[4].user[0].facebook.id);

                        //Possibly re-work model to be Mixed (Object) vs ArrayList

                        var tempTester = {};
                        //
                        //
                        tempTester.volunteer1 = $scope.campaignList.selectedOption.testers[0].volunteer1[volIt];
                        tempTester.surveyResults = $scope.campaignList.selectedOption.testers[0].surveyResults[surIt];
                        //console.log(testers);
                        //
                        //console.log('these are the testers now');
                        console.log('tempTester', tempTester);
                        ////for(var i = 0; i < testers.length; i++){
                        $scope.testerList.push(tempTester);
                        //    console.log('testerList');
                        //    console.log($scope.testerList);
                        //}
                    }

                }
            }
        }

        generateData();



        console.log('testerList', $scope.testerList);


////////////End GET to generate the campaign names for the drop-down menus///////////////

////////////Function to change generated data for View Campaigns, listed testers correspond with the campaign selected///////////////

            $scope.hasChanged = function(){
                generateData();
            };



            //console.log($scope.campaignList);
            //console.log($scope.campaignList.length);

    });

    //$scope.getTesters = function(){
    //    $http({method: "GET", url:"/viewCampaigns/getTesters"}).then(function(response){
    //        console.log(response.data.campaignName);
    //        $scope.testerList = [];
    //
    //        //for (var i = 0; i < response.data.length; i++){
    //        //    console.log(response.data[i]);
    //        //    $scope.testerList.push(response.data[i]);
    //        //}
    //
    //    });
    //};
    //$scope.getTesters();

}]);