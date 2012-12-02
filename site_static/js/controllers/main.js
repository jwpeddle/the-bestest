App.controller('MainCtrl', [
  '$scope',
  function($scope) {

	$scope.favourites = [{text:'hackathon in Toronto',url:''}, {text:'dog names',url:''}, {text:'way to relieve stress',url:''}, {text:'development IDE',url:''},{text:'things to do in Las Vegas',url:''}];

  	$scope.$on('bestest.tags.loaded', function(topic){
  		if (!! topic && !!topic.tags) {
  			$scope.favourites = null;

  			var isBurger = !!_.find(topic.tags, function(tag){ return tag ==="Burger" });
  			var isDrag = !!_.find(topic.tags, function(tag){ return tag ==="Drag" });
  			var isEreader = !!_.find(topic.tags, function(tag){ return tag ==="eReader" });

  			if (isBurger) {
  				$scope.favourites = [{text:'burrito',url:''}, {text:'milkshake',url:''}, {text:'fast food burger',url:''},{text:'roti',url:''}];
  				$scope.inToronto = true;
  			}

  			if (isDrag) {
  				$scope.favourites = [{text:'drag star',url:''}, {text:'way to fake breasts',url:''}, {text:'dancing shoes',url:''}];
  			}

  			if (isEreader) {
  				$scope.favourites = [{text:'tablet',url:''}, {text:'ultrabook computer',url:''}, {text:'online bookstore',url:''}];
  			}
  		}

		if (!$scope.favourites) {
			$scope.favourites = [{text:'hackathon in Toronto',url:''}, {text:'dog names',url:''}, {text:'ways to relieve stress',url:''}, {text:'development IDE',url:''},{text:'thing to do in Las Vegas',url:''}];
		}
  	});
    
    //$scope.tags = ['coffee','boogers'];
  }
]);
