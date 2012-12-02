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
        {ad:'/static/ads/ambassador-ad.png', tags:[], ad_unit:'The_Best'},
        {ad:'/static/ads/chango-ad.png', tags:[], ad_unit:'The_Best'},
        {ad:'/static/ads/extreme-startup-ad.png', tags:[], ad_unit:'The_Best'},
        {ad:'/static/ads/microsoft-ad.png', tags:[], ad_unit:'The_Best'},
        {ad:'/static/ads/vm-farms.png', tags:[], ad_unit:'The_Best'}
      ];
      // Filter by ad unit
      ads = _.filter(ads, function(ad) { return ad.ad_unit==='The_Best' });
      // Filter by tag
      ads = _.filter(ads, function(ad) {
                // If this ad has no tags to target we return true and the ad is good to show
                if (!!attrs.tag) {
                  // If this ad requires a tag and there no tag for this unit we do not want to show it.
                  if (_.size(ad.tags)<1) return false;
                  // Let's assume we do not show this ad unless we find an ad tag that matches the tag specified for this unit
                  var validTag = false;
                  _.each(ad.tags,function(tag){
                    if (tag===attrs.tag) validTag = true;
                  });
                  return validTag;
                }
                return true;    
              });
      var randomAd = _.random(_.size(ads)-1);
      scope.displayAd = ads[randomAd].ad; 
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