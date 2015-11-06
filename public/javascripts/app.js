/**
 * Created by usuario on 11/4/15.
 */

var app = angular.module('patcheryapp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/',{
            templateUrl:'/views/home.html',
            controller: 'HomeController'
        })
        .when('/CreateCampaign',{
            templateUrl:'/views/createCampaign.html',
            controller: 'CreateCampaignController'
        })
        .when('/MakeList',{
            templateUrl:'/views/makeList.html',
            controller: 'MakeListController'
        })
        .when('/ViewCampaign',{
            templateUrl:'/views/viewCampaign.html',
            controller: 'ViewCampaignController'
        })

    ;

    $locationProvider.html5Mode(true);


});


app.controller('FormController', ['$scope', '$http', function($scope, $http) {
    function sendEmail(){
        $http({
            method: 'POST',
            url: "/email/sentEmail"
        });
    };
}]);
