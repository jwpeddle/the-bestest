App.controller('TopicCtrl', [
  '$scope',
  '$routeParams',
  'models',
  'pagination',
  '$timeout',
  '$rootScope',
  'topicService',
  'VOTES_REFRESH_INTERVAL',
  function($scope, $routeParams, models, pagination, $timeout,
          $rootScope, topicService, VOTES_REFRESH_INTERVAL) {

    $scope.pagination = pagination;

    // Is it a year search?
    if (topicService.isYear($routeParams.year)) {
      $scope.yearFilter = $routeParams.year;
    }

    if (topicService.isMonth($routeParams.month)) {
      $scope.monthFilter = $routeParams.month;
    }

    $scope.topic = getTopicInfo();

    $scope.addNewEntry = function(entry) {
      $scope.newEntry = "";
      models.Entry.create($routeParams.topic_id, entry);
    };

    $scope.addNewTag = function(tag) {
      $scope.topic.tags.push({name: tag});
      $scope.newTag = "";
      models.Tag.create($routeParams.topic_id, tag);
    };

    $scope.removeTag = function(topic, tag) {
      models.Topic.removeTag(topic, tag);
    };

    $scope.addVote = function(entry) {
      refreshVotes(entry);
      models.Vote.create(entry.id);
    };

    $scope.expandAnswer = function(index) {
      expandAnswerId = index;
    };

    $scope.$on("bestest.models.entry.created", function(m, entry) {
      $scope.topic.entries.push(entry);
      refreshEntries($scope.topic.entries);
    });

    function refreshEntries(entries) {
      topicService.applyFilters(entries, $scope.yearFilter, $scope.monthFilter);
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
// Do this dynamically
$scope.topic.location = 'St. John\'s';
$scope.topic.year = 2011;
        if (!!response.tags && response.tags.length) {
          $rootScope.$broadcast("bestest.tags.loaded", response.tags);
        }
        refreshEntries(response.entries);
      });
    }

    setInterval(function() {
      console.log("RR");
      getTopicInfo();
    }, VOTES_REFRESH_INTERVAL);

  }
]);
