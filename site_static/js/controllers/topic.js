App.controller('TopicCtrl', [
  '$scope',
  '$routeParams',
  function($scope, $routeParams) {
    $scope.topicId = $routeParams.topic_id;
  }
]);
