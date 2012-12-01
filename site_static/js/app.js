var App = angular.module('ngView', [
  // Application dependencies
  'ui'
  ], [
  '$routeProvider',
  '$locationProvider',
  function($routeProvider, $locationProvider) {

    var routerService = {
      invalidURL: '/404',
      topicURL: '/topic/:topic_id'
    };

    $locationProvider.html5Mode(true);

    $routeProvider.when(routerService.topicURL, {
      templateUrl: '/static/templates/topic.html',
      controller: 'TopicCtrl'
    });

    $routeProvider.otherwise({
      redirectTo: routerService.invalidURL
    });

}]);

