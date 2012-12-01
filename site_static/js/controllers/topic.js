App.controller('TopicCtrl', [
  '$scope',
  '$routeParams',
  'models',
  function($scope, $routeParams, models) {

    $scope.topic = models.Topic.get({topicId: $routeParams.topic_id}, function(response) {
      $scope.topic = response;
    });

    $scope.addNewEntry = function(entry) {
      models.Entry.create($routeParams.topic_id, entry);
    };
  }
]);
