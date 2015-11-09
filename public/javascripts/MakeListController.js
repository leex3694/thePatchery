/**
 * Created by usuario on 11/6/15.
 */
app.controller('MakeListController', ['$scope','$http', function($scope,$http){

//    This controller will first display the names of the created campaigns in a drop down
//    Once a campaign name is chosen the number of volunteers for that campaign will be displayed
//    Checkboxes will capture the input of the sizes required for the campaign
//    and finally a button is pushed to generate a random list that contains one  person for each size chosen


        $scope.campaignName = "";



        $http({
            method: 'GET',
            url: '/makeList/getVolunteers'
        }).then(function (response){
            var volunteer  = response.data;
            console.log(volunteer);
        });









}]);