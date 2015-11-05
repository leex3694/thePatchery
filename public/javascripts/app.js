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
        .when('/work', {
            templateUrl: '/views/work.html',
            controller: 'WorkController'
        });

    $locationProvider.html5Mode(true);



});
