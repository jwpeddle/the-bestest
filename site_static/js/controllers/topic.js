App.controller('TopicCtrl', [
  '$scope',
  '$routeParams',
  'models',
  'pagination',
  function($scope, $routeParams, models, pagination) {

    $scope.pagination = pagination;

    $scope.topic = models.Topic.get({topicId: $routeParams.topic_id}, function(response) {
      $scope.topic = response;
      pagination.setItems(_.sortBy(response.entries,
                                    function(n) {
                                      return -n.number_of_votes;
                                    }));
    });

    $scope.addNewEntry = function(entry) {
      models.Entry.create($routeParams.topic_id, entry);
    };
  }
]);
