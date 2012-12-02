App.directive('chart', [
  function() {
    return {
      restrict: 'E',
      templateUrl: '/static/templates/chart.html',
      link: function(scope, elem, attrs) {
        scope.$watch(attrs.topic, function(topic) {
          window.TOPIC = topic;
          //console.log(topic.entries);
        });
      }
    }
  }
]);
