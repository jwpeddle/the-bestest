var App = angular.module('ngView', [
  // Application dependencies
  'ui',
  'ngResource',
  'ngSanitize'
  ], [
  '$routeProvider',
  '$locationProvider',
  function($routeProvider, $locationProvider) {

    var routerService = {
      invalidURL: '/404',
      topicURL: '/:topic_id',
      topicByYearURL: '/:topic_id/:year',
      topicByMonthURL: '/:topic_id/:year/:month',
      advertiseURL: '/advertise'
    };

    $locationProvider.html5Mode(true);

    $routeProvider.when(routerService.topicURL, {
      templateUrl: '/static/templates/topic.html',
      controller: 'TopicCtrl'
    });

    $routeProvider.when(routerService.topicByYearURL, {
      templateUrl: '/static/templates/topic.html',
      controller: 'TopicCtrl'
    });

    $routeProvider.when(routerService.topicByMonthURL, {
      templateUrl: '/static/templates/topic.html',
      controller: 'TopicCtrl'
    });

    $routeProvider.when(routerService.invalidURL, {
      templateUrl: '/static/templates/404.html'
    });

    $routeProvider.when(routerService.advertiseURL, {
      templateUrl: '/static/templates/advertise.html'
    });

    $routeProvider.otherwise({
      redirectTo: routerService.invalidURL
    });

}]);

