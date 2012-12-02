App.directive('questionHeader', function(){
  return {
    restrict: 'E',
    templateUrl: '/static/templates/question-header.html',
    link: function(scope, element, attrs) {
      
      if (!attrs.ask) {
        console.error('No name given for question directive');
        return false;
      }

      var getHeaderWidth = function(elem) {
        if (!elem) elem = 'span';
        var $this = element.find(elem);
        return $this.width();
      };

      scope.$watch(attrs.ask, function(name) {
        if (!name) return;
        scope.name = name;

        element.find('h1').removeClass('short-name');
debugger;
        var newWidth;
        var smallWidth;
        setTimeout(function(){
          newWidth = getHeaderWidth();
          smallWidth = getHeaderWidth('small');
          if (newWidth > smallWidth)
            element.find('h1').width(newWidth);
          else
            element.find('h1').addClass('short-name');
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