App.controller('CreateTopicCtrl', [
  '$scope',
  '$location',
  '$http',
  'TASTYPIE_BASE',
  function($scope, $location, $http, TASTYPIE_BASE) {
    $scope.createTopic = function(name) {
      $http.post(TASTYPIE_BASE + 'topic', {
        name: name
      }).success(function(response) {
        $location.path('/' + response.id);
      });
    };
  }
]);
