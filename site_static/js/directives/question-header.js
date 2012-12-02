App.directive('questionHeader', function(){
  return {
    restrict: 'E',
    templateUrl: '/static/templates/question-header.html',
    link: function(scope, element, attrs) {
      
      if (!attrs.ask) {
        console.error('No name given for question directive');
        return false;
      }

      var getHeaderWidth = function() {
        var $this = element.find('span');
        return $this.width();
      };

      scope.$watch(attrs.ask, function(name) {
        if (!name) return;
        scope.name = name;

        var newWidth;
        setTimeout(function(){
          newWidth = getHeaderWidth();
          element.find('h1').width(newWidth);
        }, 2000);
      });

      scope.$watch(attrs.year, function(year) {
        if (!!year) {
          scope.year = year;
        }
      });

      scope.$watch(attrs.location, function(place) {
        if (!!place) {
          scope.location = place;
        }
      });
    }
  };
});