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
    $scope.tempTestersArray = [];
    $scope.showFinalTester = false;


    $http({
        method: 'GET',
        url: '/makeList/getVolunteers'
    }).then(function (response){

        $scope.tempList = response.data;
        $scope.campaignList.selectedOption = {};
        $scope.campaignList.availableOptions = [];
        $scope.tempList.forEach(function(item){
           $scope.campaignList.availableOptions.push(item);
        });

        $scope.campaignList.selectedOption = $scope.campaignList.availableOptions[0];


    });

    $scope.sendData = function(){

        generatingTesters();

        var dataToSend = {};

            dataToSend.selectedCampaign = $scope.campaignList.selectedOption;

            dataToSend.selectedSizes = $scope.formData;

            $http({
                method: 'PUT',
                url: '/makeList/sizes',
                data: dataToSend
            }).then(function(response){
                $scope.showFinalTester = true;

            });

        acceptNewList();
    };

    function generatingTesters() {
        $scope.tempTestersArray = [];
        var volunteerList = $scope.campaignList.selectedOption.volunteers;

        //function that goes through all volunteers and puts them into a tempArray depending on what size they selected on signUp
        for (var i = 0; i < volunteerList.length; i++) {

            switchSizes(volunteerList[i]);
        }

        function getRandomVolunteer(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }

        function randomTesterPushTempArray(array) {
            var randomVolunteer = getRandomVolunteer(0, (array.length -1));
            var tester = array[randomVolunteer];
            $scope.tempTestersArray.push(tester);
            console.log('this is the temp testers array');
            console.log($scope.tempTestersArray);
        }

        function selectTester() {
            if ($scope.formData.sizes.twoT == true) {
                randomTesterPushTempArray(twoTTempArray);
            }
            if ($scope.formData.sizes.threeT == true) {
                randomTesterPushTempArray(threeTTempArray);
            }
            if ($scope.formData.sizes.fourT == true) {
                randomTesterPushTempArray(fourTTempArray);
            }
            if ($scope.formData.sizes.fiveT == true) {
                randomTesterPushTempArray(fiveTTempArray);
            }
            if ($scope.formData.sizes.six == true) {
                randomTesterPushTempArray(sixTempArray);
            }
            if ($scope.formData.sizes.seven_eight == true) {
                randomTesterPushTempArray(sevenEightTempArray);
            }
            if ($scope.formData.sizes.nine_ten == true) {
                randomTesterPushTempArray(nineTenTempArray);
            }

        }

        selectTester();
    }

    $scope.regenerateTesters = function(){
        generatingTesters();
    };

    function acceptNewList(){
        $scope.acceptListandPost = function(){
            var sendTesterArrayData = {};
            sendTesterArrayData.selectedCampaign = $scope.campaignList.selectedOption;
            console.log($scope.campaignList.selectedOption);
            sendTesterArrayData.volunteer1 = $scope.tempTestersArray;
            console.log('this is tester array we are trying to send ');
            console.log($scope.tempTestersArray);
            console.log($scope.tempTestersArray[0].email);

            $http({
                method:'PUT',
                url:'makeList/postTesterArray',
                data: sendTesterArrayData
            });

        };
        alert("You successfully made a new tester list");
    }

//switch function for putting volunteers into tempArrays, depending on what sizes are selected in the makeList
    function switchSizes(volunteer) {
        switch (volunteer.size) {
            case "2T":
                if ($scope.formData.sizes.twoT == true) {
                    twoTTempArray.push(volunteer);
                }
                break;

            case "3T":
                if ($scope.formData.sizes.threeT == true) {
                    threeTTempArray.push(volunteer);
                }
                break;

            case "4T":
                if ($scope.formData.sizes.fourT == true) {
                    fourTTempArray.push(volunteer);
                }
                break;

            case "5T":
                if ($scope.formData.sizes.fiveT == true) {
                    fiveTTempArray.push(volunteer);
                }
                break;

            case "6":
                if ($scope.formData.sizes.six == true) {
                    sixTempArray.push(volunteer);
                }
                break;

            case "7/8":
                if ($scope.formData.sizes.seven_eight == true) {
                    sevenEightTempArray.push(volunteer);
                }
                break;

            case "9/10":
                if ($scope.formData.sizes.nine_ten == true) {
                    nineTenTempArray.push(volunteer);
                }
                break;
        }

    }

}]);