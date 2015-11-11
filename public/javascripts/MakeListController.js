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
            var twoTTempArray = [];
            var threeTTempArray = [];
            var fourTTempArray = [];
            var fiveTTempArray = [];
            var sixTempArray = [];
            var sevenEightTempArray = [];
            var nineTenTempArray = [];

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

            //console.log($scope.campaignList);
            //console.log($scope.campaignList.length);





        });











    $scope.sendData = function(){


            var volunteerList = $scope.campaignList.selectedOption.volunteers;

            for (var i = 0; i < volunteerList.length; i++) {
                console.log(volunteerList[i].size);
                switchSizes(volunteerList[i]);

            }








        var dataToSend = {};


            dataToSend.selectedCampaign = $scope.campaignList.selectedOption;


            //console.log($scope.formData);
            //console.log(dataToSend);

            dataToSend.selectedSizes = $scope.formData;

            //console.log("This should be the sizes chosen "+ JSON.stringify(dataToSend.selectedSizes));


            $http({
                method: 'PUT',
                url: '/makeList/sizes',
                data: dataToSend
            }).then(function(response){
                console.log("Sizes sent");
            });










        //add sizes to data to send

        //http POST
    };



//switch function for putting volunteers into tempArrays, depending on what sizes are selected in the makeList
    function switchSizes(volunteer) {
        switch (volunteer.size) {
            case "2T":
                if ($scope.formData.sizes.twoT == true) {
                    twoTTempArray.push(volunteer);
                    console.log('twoTemp: ');
                    console.log(twoTTempArray);
                }
                break;

            case "3T":
                if ($scope.formData.sizes.threeT == true) {
                    threeTTempArray.push(volunteer);
                    console.log('threeTempT');
                    console.log(threeTTempArray);
                }
                break;

            case "4T":
                if ($scope.formData.sizes.fourT == true) {
                    fourTTempArray.push(volunteer);
                    console.log('fourTempT');
                    console.log(fourTTempArray);
                }
                break;

            case "5T":
                if ($scope.formData.sizes.fiveT == true) {
                    fiveTTempArray.push(volunteer);
                    console.log('fiveTempT');
                    console.log(fiveTTempArray);
                }
                break;

            case "6":
                if ($scope.formData.sizes.six == true) {
                    sixTempArray.push(volunteer);
                    console.log('sixTempT');
                    console.log(sixTempArray);
                }
                break;

            case "7/8":
                if ($scope.formData.sizes.seven_eight == true) {
                    sevenEightTempArray.push(volunteer);
                    console.log('seven/eightTempT');
                    console.log(sevenEightTempArray);
                }
                break;
        }

    }






}]);