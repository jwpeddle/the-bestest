App.directive('carousel', function() {

  return {
    restrict: 'E',
    templateUrl: '/static/templates/carousel.html',
    scope: true,
    link: function(scope, element, attrs) {
      
      var rotationInterval = 5000;
      scope.failed = false;
      // Can't do anything if carousel is not loaded
      if (typeof element.carousel !== "function") {
        console.error('Angular Bootstrap Carousel requires both jQuery and Bootstrap. One or the other is not loaded properly.');
        scope.failed = true;
        return;
      }

      if (!attrs.items) {
        console.error('Angular Bootstrap Carousel requires an array of strings or objects to be passed into data-items');
        scope.failed = true;
        return;
      }
      scope.items = scope.$eval(attrs.items);

      if (!attrs.id) {
        console.error('Angular Bootstrap Carousel requires an ID.');
        scope.failed = true;
        return;
      }

      // Set scope defaults
      scope.id = attrs.id; // Carousel Element ID
      scope.hideBlockControls = false;
      scope.hideArrowControls = true;

      // Remove the id tag from the directive element since it will be applied to the first child
      element.removeAttr('id');

      if (!!attrs.interval) {
        rotationInterval = attrs.interval;
      }

      // Hide the block controls
      if (typeof attrs.hideBlockControls !== "undefined") {
        scope.hideBlockControls = true;
      }

      // Hide the arrow controls that float right
      if (typeof attrs.hideArrowControls !== "undefined") {
        scope.hideArrowControls = true;
      }

      // tickerIndex represents the showing text
      // Start from the beginning
      scope.tickerIndex = 0;
      
      // Initiate the Bootstral carousel
      element.carousel({
        interval: rotationInterval
      });

      var setTickerIndex = function(index) {
        scope.tickerIndex = index;
      };

      element.bind('slid',
        function(e) {
          setTickerIndex(element.find('.item.active').index());
          scope.$apply();
        }
      );

      scope.skipTo = function(id){
        element.carousel(id);
      };
    }
  };

});