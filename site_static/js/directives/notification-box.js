App.directive('notificationBox', [
  '$rootScope',
  '$timeout',
  function($rootScope, $timeout) {
    return {
      restrict: 'E',
      templateUrl: '/static/templates/notification-box.html',
      link: function(scope, elem, attrs) {

        scope.$watch('visible', function(value) {
          if (!!value) {
            $timeout(function() {
              scope.visible = false;
            }, 5000);
          }
        });

        // Applicaton messages
        scope.$on("bestest.models.entry.willCreate", function(m, entryName) {
          scope.text = "Entry " + entryName + " succesfully created!";
          scope.visible = true;
        });

        scope.$on("bestest.models.vote.willCreate", function(m) {
          scope.text = "Your vote has been registered!";
          scope.visible = true;
        });
      }
    };
  }
]);
