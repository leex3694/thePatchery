/**
 * Created by usuario on 11/6/15.
 */
app.controller('ViewCampaignController', ['$scope', '$http', function($scope, $http){

    $scope.tempList = [];
    $scope.campaignList = [];
    $scope.testNameChosen = "";
    $scope.formData ={};

    $http({
        method: 'GET',
        url: '/viewCampaigns/getCampaigns'
    }).then(function (response){

    $scope.tempList = response.data;
    $scope.campaignList.selectedOption = {};
    $scope.campaignList.availableOptions = [];

    $scope.tempList.forEach(function(item){
        $scope.campaignList.availableOptions.push(item);
    });

    $scope.campaignList.selectedOption = $scope.campaignList.availableOptions[0];

        console.log($scope.campaignList);
        console.log($scope.campaignList.length);

    });

    $scope.getSwatches = function(){
        $http({method: "GET", url:"/home/get"}).then(function(response){

            $scope.swatchList = [];

            for (var i = 0; i < response.data.length; i++){
                console.log(response.data[i]);
                $scope.swatchList.push(response.data[i]);
            }

        });
    };

    $scope.getSwatches();

}]);