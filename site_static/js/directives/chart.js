App.directive('chart', [
  function() {
    return {
      restrict: 'E',
      templateUrl: '/static/templates/chart.html',
      link: function(scope, elem, attrs) {
        scope.$watch(attrs.topic, function(topic) {
          // some kind of chart magic goes here
        });
      }
    }
  }
]);
