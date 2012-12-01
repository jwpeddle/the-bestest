App.directive('adTag', function() {
  return {
    restrict: 'E',
    scope: true,
    link: function (scope, element, attrs) {

      if (!attrs.adUnit) {
        console.error('Ad tag directive requires ad_unit (Google DFP property).');
        return false;
      }

      scope.adUnit = attrs.adUnit;
      scope.adUnitDivId = "ad-tag-"+scope.adUnit;

      // Default ad size
      scope.width = 300;
      scope.height = 250;

      element.css('width',scope.width);
      
      var addDimension = function(dimension,value) {
        if (!!value) {
          if (!_.isNumber(value))
            value = parseInt(value, 10)
          scope[dimension] = value;
        }
      };

      addDimension('width', attrs.width);
      addDimension('height', attrs.height);

      // Hackathon Hack
      // Typically these ads would be loaded directly from DFP
      var ads = [
        {ad:'/static/ads/coffee.jpg', tags:['coffee'], ad_unit:'The_Best'},
        {ad:'/static/ads/coffee.jpg', tags:['coffee'], ad_unit:'The_Best'}
      ];
      ads = _.filter(ads, function(ad) { return ad.ad_unit==='The_Best' });
      var randomAd = _.random(_.size(ads));
      scope.displayAd = ads[0].ad; 
      // End of silly hack

      // googletag.cmd.push(function() {
      //   googletag.defineSlot('/1041600/'+scope.adUnit, [scope.width, scope.height], scope.adUnitDivId).addService(googletag.pubads());
      //   googletag.pubads().enableSingleRequest();
      //   googletag.enableServices();
      // });

      // googletag.cmd.push(function() { googletag.display(scope.adUnitDivId); });
    }
  }
});