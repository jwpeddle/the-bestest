  App.directive('delayedHover',['$timeout',function($timeout){
	return {
    restrict: 'A',
    scope: true,
    link: function(scope, element, attrs){
      
      var index = attrs.delayedHover;
      var delay = 3000;

      // Prevents the callback (on exit)
      scope.halt = false;

      element.hover(
        // Enter
        function () {
          scope.halt = false;
          $timeout(function(){ 
            if (!scope.halt)
              scope.expandAnswerId = scope.$eval(index);
          },delay);
        }, 
        // Exit
        function () {
          scope.halt = true;
          console.log('Exiting');
          scope.expandAnswerId = null;
        }
      );
    }
  };
}]);