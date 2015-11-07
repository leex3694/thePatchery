/**
 * Created by usuario on 11/6/15.
 */
app.controller('MainController', ['$scope', '$http', function($scope, $http) {


    //the send Email Post that will send and email when accept list button is clicked
    function sendEmail(){
        $http({
            method: 'POST',
            url: "/email/sentEmail"
        });
    }
}]);