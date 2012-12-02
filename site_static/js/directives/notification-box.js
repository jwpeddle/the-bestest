App.directive('notificationBox', [
  '$rootScope',
  '$timeout',
  function($rootScope, $timeout) {
    return {
      restrict: 'E',
      templateUrl: '/static/templates/notification-box.html',
      link: function(scope, elem, attrs) {

        scope.$watch('visible', function() {
          $timeout(function() {
            scope.visible = false;
          }, 5000);
        });

        // Applicaton messages
        scope.$on("bestest.models.entry.created", function(entry) {
          scope.text = "Entry " + entry.name + " succesfully created!";
          scope.visible = true;
          scope.$apply();
        });
      }
    };
  }
]);
