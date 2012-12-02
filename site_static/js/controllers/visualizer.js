App.controller('VisualizerCtrl', [
  '$scope',
  '$routeParams',
  'models',
  'topicService',
  function($scope, $routeParams, models, topicService) {
    var _drawnEntries = [];

    $scope.votes = VOTES;

    $scope.topic = models.Topic.get({topicId: $routeParams.topic_id}, function(response) {
      _.each(response.entries, function(entry) {
        entry.votes = _.map(entry.votes, function(vote) {
          return _.find(VOTES, function(VOTE) {
            return VOTE.resource_uri === vote;
          });
        });
      });
      refreshEntries($scope.topic.entries);
      $scope.addToAggregates(angular.copy($scope.topic.entries[0]));
    });

    $scope.aggregates = [];

    $scope.addToAggregates = function(entry) {
      var aggregate = [];

      // If it is already drawn delete it
      //debugger;
      if (!!_.find($scope.aggregates, function(i) { return i.label === entry.name; })) {
        $scope.aggregates = _.filter($scope.aggregates, function(i) {
          return i.label !== entry.name;
        });
        return;
      }

      _drawnEntries.push(entry.id);
      _.each(entry.votes, function(vote) {
        var mdate = moment(vote.date);
        aggregate.push(mdate.format('YYYYMM'));
      });
      aggregate = _.countBy(aggregate, function(yyyymm){return moment(yyyymm, 'YYYYMM').valueOf();});
      aggregate = _.map(aggregate, function(value, key){return [key, value * 10];});
      $scope.aggregates.push({
        'label': entry.name,
        'data': aggregate
      });

    };

    $scope.isDrawn = function(entry) {
      return (!!_.find($scope.aggregates, function(i) { return i.label === entry.name; })) ? "entry-selected" : "";
    };

    $scope.$watch('yearFilter+monthFilter', function() {
      refreshEntries(topicService.applyFilters(angular.copy($scope.topic.entries), $scope.yearFilter, $scope.monthFilter));
      refreshAggregates();
    });

    function refreshEntries(entries) {
      entries = _.sortBy(entries, function(n) {
                    return -n.number_of_votes;
                  });
      $scope.entries = entries;
    }

    function refreshAggregates() {
      var entry,
          newAggregates = [];

      _.each($scope.aggregates, function(aggregate) {
        entry = _.find($scope.entries, function(entry) {
          return entry.name === aggregate.label;
        });
        console.log("ENTRY", entry);
        newAggregates.push(entry);
      });

      $scope.aggregates = [];
      _.each(newAggregates, function(entry) {
        $scope.addToAggregates(entry);
      });
    }

  }
]);
