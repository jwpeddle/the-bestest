App.controller('TopicCtrl', [
  '$scope',
  '$routeParams',
  'models',
  'pagination',
  function($scope, $routeParams, models, pagination) {

    $scope.pagination = pagination;

    $scope.topic = models.Topic.get({topicId: $routeParams.topic_id}, function(response) {
      $scope.topic = response;
      refreshEntries(response.entries);
    });

    $scope.addNewEntry = function(entry) {
      models.Entry.create($routeParams.topic_id, entry);
    };

    $scope.addVote = function(answerId) {
      models.Vote.create(answerId);
    };

    $scope.$on("bestest.models.entry.created", function(m, entry) {
      $scope.topic.entries.push(entry);
      refreshEntries($scope.topic.entries);
    });

    function refreshEntries(entries) {
      pagination.setItems(_.sortBy(entries,
                              function(n) {
                                return -n.number_of_votes;
                              }));
    }
  }
]);
