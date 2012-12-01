var App = angular.module('ngView', [
  // Application dependencies
  'ui'
  ], [
  '$routeProvider',
  '$locationProvider',
  function($routeProvider, $locationProvider) {

    var routerService = {
      invalidURL: '/404',
      topicURL: '/:topic_id'
    };

    $locationProvider.html5Mode(true);

    $routeProvider.when(routerService.topicURL, {
      templateUrl: '/route/to/templates.topic.html',
      controller: 'TopicCtrl'
    });

    $routeProvider.otherwise({
      redirectTo: routerService.invalidURL
    });

}]);

