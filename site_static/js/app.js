var App = angular.module('ngView', [
  // Application dependencies
  'ui',
  'ngResource'
  ], [
  '$routeProvider',
  '$locationProvider',
  function($routeProvider, $locationProvider) {

    var routerService = {
      invalidURL: '/404',
      topicURL: '/:topic_id',
      advertiseURL: '/advertise'
    };

    $locationProvider.html5Mode(true);

    $routeProvider.when(routerService.topicURL, {
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

