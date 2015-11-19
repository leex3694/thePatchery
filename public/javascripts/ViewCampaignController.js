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

        $scope.testerList = [];


        if($scope.campaignList.selectedOption.testers.length >= 1){
            //Possibly re-work model to be Mixed (Object) vs ArrayList
            var testers = $scope.campaignList.selectedOption.testers[0].volunteer1;

            console.log(testers);

            console.log('these are the testers now');
            console.log(testers);
            for(var i = 0; i < testers.length; i++){
                $scope.testerList.push(testers[i]);
                console.log('testerList');
                console.log($scope.testerList);
            }
        }


////////////End GET to generate the campaign names for the drop-down menus///////////////

////////////Function to change generated data for View Campaigns, listed testers correspond with the campaign selected///////////////

            $scope.hasChanged = function(){
                $scope.testerList = [];
                console.log('this is the changed function',$scope.campaignList.selectedOption);
                if($scope.campaignList.selectedOption.testers.length >= 1) {

                    var testers = ($scope.campaignList.selectedOption.testers[0].volunteer1);
                    console.log('these are the testers now');
                    console.log(testers);

                    for (var i = 0; i < testers.length; i++) {
                        $scope.testerList.push(testers[i]);
                        console.log('testerList');
                        console.log($scope.testerList);
                    }
                }
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