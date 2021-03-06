App.controller('LatestCtrl', [
  '$scope',
  'models',
  '$http',
  '$filter',
  '$location',
  'TASTYPIE_BASE',
  function($scope, models, $http, $filter, $location, TASTYPIE_BASE) {
    $scope.latestEntries = models.Entry.get(function(response) {
      var entries,
          topicIds,
          topics;

      entries = response.objects;
      _.each(entries, function(entry) {
        entry.topic_id = $filter('idFromTasty')(entry.topic_id);
      });
      topicIds = _.uniq(_.pluck(entries, 'topic_id'));
      topics = $http.get(TASTYPIE_BASE + 'topic/set/' + topicIds.join(';') + '/')
              .success(function(response) {
                topics = response.objects;
                _.map(entries, function(entry) {
                  entry.topic = _.find(topics, function(topic) {
                    return (topic.id == entry.topic_id);
                  });
                });
                $scope.latestEntries = entries.slice(0, 10);
              });

      $scope.createTopic = function() {
        $location.path("/create-topic");
      };

    });
  }
]);
