/**
 * Created by usuario on 11/6/15.
 */
app.controller('MakeListController', ['$scope','$http', function($scope,$http){

//    This controller will first display the names of the created campaigns in a drop down
//    Once a campaign name is chosen the number of volunteers for that campaign will be displayed
//    Checkboxes will capture the input of the sizes required for the campaign
//    and finally a button is pushed to generate a random list that contains one  person for each size chosen
            $scope.tempList = [];
            $scope.campaignList = [];
            $scope.volunteer = [];
            $scope.volunteer.campaignName = "";
            $scope.testNameChosen = "";
            $scope.formData ={};
        $http({
            method: 'GET',
            url: '/makeList/getVolunteers'
        }).then(function (response){
            //$scope.volunteer = response.data;
            //console.log($scope.volunteer);
            //console.log($scope.volunteer.length);




            $scope.tempList = response.data;

            //console.log($scope.campaignList.volunteers[0].length);

            $scope.campaignList.selectedOption = {};
            $scope.campaignList.availableOptions = [];
            $scope.tempList.forEach(function(item){
               $scope.campaignList.availableOptions.push(item);
            });

            $scope.campaignList.selectedOption = $scope.campaignList.availableOptions[0];

            console.log($scope.campaignList);
            console.log($scope.campaignList.length);

        });


       // $scope.formData ={};








    $scope.sendData = function(){
                var dataToSend = {};


                dataToSend.selectedCampaign = $scope.campaignList.selectedOption;


                console.log($scope.formData);
                console.log(dataToSend);

               dataToSend.selectedSizes = $scope.formData;

                console.log("This should be the sizes chosen "+ dataToSend.selectedSizes);


                $http({
                    method: 'PUT',
                    URL: '/sizes',
                    data: dataToSend.selectedSizes
                }).then(function(response){

                        console.log("Sizes sent");

                });










        //add sizes to data to send

        //http POST
    }










}]);