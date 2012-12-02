App.controller('TopicCtrl', [
  '$scope',
  '$routeParams',
  'models',
  'pagination',
  '$timeout',
  'VOTES_REFRESH_INTERVAL',
  function($scope, $routeParams, models, pagination, $timeout,
          VOTES_REFRESH_INTERVAL) {

    $scope.pagination = pagination;

    $scope.topic = getTopicInfo();

    $scope.addNewEntry = function(entry) {
      models.Entry.create($routeParams.topic_id, entry);
    };

    $scope.addVote = function(entry) {
      refreshVotes(entry);
      models.Vote.create(entry.id);
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

    // Introduce a fake vote while the entry refreshes
    function refreshVotes(entry) {
      entry.number_of_votes++;
      entry.votes.push({
        date: moment().format("YYYY-MM-DD")
      });
    }

    function getTopicInfo() {
      return  models.Topic.get({topicId: $routeParams.topic_id}, function(response) {
        $scope.topic = response;
        refreshEntries(response.entries);
      });
    }

    setInterval(function() {
      console.log("RR");
      getTopicInfo();
    }, VOTES_REFRESH_INTERVAL);

  }
]);
