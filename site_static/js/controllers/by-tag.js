App.controller('ByTagCtrl', [
  '$scope',
  '$routeParams',
  '$http',
  '$filter',
  'models',
  'TASTYPIE_BASE',
  function($scope, $routeParams, $http, $filter, models, TASTYPIE_BASE) {
    $scope.tagId = $routeParams.tag_id;
    $scope.tag = models.Tag.get(
      {
        tagId: $routeParams.tag_id
      },
      function(response) {
        var topicIds = [];
        $scope.tag = response;
        _.each(response.topics, function(topic) {
          topicIds.push($filter('idFromTasty')(topic));
        });

        topicIds = _.uniq(topicIds);
        $http.get(TASTYPIE_BASE + 'topic/set/' + topicIds.join(';') + '/')
          .success(function(response) {
            $scope.tagTopics = response.objects;
          });
      });
  }
]);
