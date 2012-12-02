App.controller('MainCtrl', [
  '$scope',
  function($scope) {

  	var favoritesDefault = [{text:'hackathon in Toronto',url:''}, {text:'dog names',url:''}, {text:'way to relieve stress',url:''}, {text:'development IDE',url:''},{text:'things to do in Las Vegas',url:''}];
	$scope.favourites = favoritesDefault

  	$scope.$on('bestest.tags.loaded', function(i, tags){
  		if (!!tags) {
  			$scope.favourites = null;

  			var isBurger = !!_.find(tags, function(tag){ return tag.name ==="Burger" });
  			var isDrag = !!_.find(tags, function(tag){ return tag.name ==="Drag" });
  			var isEreader = !!_.find(tags, function(tag){ return tag.name ==="eReader" });

  			if (isBurger) {
  				$scope.favourites = [{text:'burrito in Toronto',url:''}, {text:'milkshake in Toronto',url:''}, {text:'fast food burger in Toronto',url:''},{text:'roti in Toronto',url:''}];
  				$scope.inToronto = true;
  				$scope.tags = ['Burger'];
  				console.log('T');
  			}

  			if (isDrag) {
  				$scope.favourites = [{text:'drag star',url:''}, {text:'way to fake breasts',url:''}, {text:'dancing shoes',url:''}];
  			}

  			if (isEreader) {
  				$scope.favourites = [{text:'tablet',url:''}, {text:'ultrabook computer',url:''}, {text:'online bookstore',url:''}];
  			}
  		}

		if (!$scope.favourites) {
			$scope.favourites = favoritesDefault;
		}
  	});

  }
]);
