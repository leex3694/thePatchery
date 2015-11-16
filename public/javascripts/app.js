
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
        .when('/listToAccept',{
            templateUrl:'/views/listToAccept.html',
            controller: 'ListToAcceptController'
        })
        .otherwise({redirectTo: '/views/home.html'
        })
    ;

    $locationProvider.html5Mode(true);


});



