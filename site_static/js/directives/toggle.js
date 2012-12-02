App.directive('toggle',function(){
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, element, attrs) {
      scope.$watch(attrs.toggle, function(value) {
        // Give the developer the ability to alternate the boolean of value for sliding up or down
        if (typeof attrs.alternate != "undefined") {
          value = !value;
        }

        var speed = '';
        if (typeof attrs.transitionSlow != "undefined") {
          speed = 'slow';
        }
        if (typeof attrs.transitionFast != "undefined") {
          speed = 'fast';
        }

        if (element.is(':visible') && (!value || value==="up"  || value==="hide")) {
          element.slideUp(speed);
          return;
        }
        if (!element.is(':visible') && !!value) {
          element.slideDown(speed);
          return;
        }
      });
    }
  };
});