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
      topicsByTagURL: '/tag/:tag_id',
      advertiseURL: '/advertise',
      latestURL: '/latest',
      visualizerURL: '/visualizer/:topic_id',
      createTopicURL: '/create-topic'
    };

    $locationProvider.html5Mode(true);

    $routeProvider.when(routerService.advertiseURL, {
      templateUrl: '/static/templates/advertise.html'
    });

    $routeProvider.when(routerService.latestURL, {
      templateUrl: '/static/templates/latest.html',
      controller: 'LatestCtrl'
    });

    $routeProvider.when(routerService.topicsByTagURL, {
      templateUrl: '/static/templates/by-tag.html',
      controller: 'ByTagCtrl'
    });

    $routeProvider.when(routerService.visualizerURL, {
      templateUrl: '/static/templates/visualizer.html',
      controller: 'VisualizerCtrl'
    });

    $routeProvider.when(routerService.createTopicURL, {
      templateUrl: '/static/templates/create-topic.html',
      controller: 'CreateTopicCtrl'
    });

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

    $routeProvider.otherwise({
      redirectTo: routerService.invalidURL
    });

}]);

