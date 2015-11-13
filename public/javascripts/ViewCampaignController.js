app.controller('ViewCampaignController', ['$scope', '$http', function($scope, $http){

    $scope.tempList = [];
    $scope.campaignList = [];
    $scope.testNameChosen = "";
    $scope.formData ={};

    $http({method: 'GET', url: '/viewCampaigns/getCampaigns'}).then(function (response){

        $scope.tempList = response.data;
        $scope.campaignList.selectedOption = {};
        $scope.campaignList.availableOptions = [];

        $scope.tempList.forEach(function(item){
            $scope.campaignList.availableOptions.push(item);
        });

        $scope.campaignList.selectedOption = $scope.campaignList.availableOptions[0];




            $scope.hasChanged = function(){
                $scope.testerList = [];
                console.log('this is the changed function',$scope.campaignList.selectedOption);
                var testers = ($scope.campaignList.selectedOption.testers[0].volunteer1);
                console.log('these are the testers now');
                console.log(testers);

                for(var i = 0; i < testers.length; i++){
                    $scope.testerList.push(testers[i]);
                    console.log('testerList');
                    console.log($scope.testerList);
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