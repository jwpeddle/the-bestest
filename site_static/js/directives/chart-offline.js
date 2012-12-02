App.directive('chartOffline', [
  function() {
    return {
      restrict: 'E',
      link: function(scope, elem, attrs) {
        scope.$watch(attrs.aggregates, function(aggregates) {
          if (!aggregates) aggregates = [];

          $.plot(elem.find('.chart'), aggregates, {
            xaxis: {
              mode: "time",
              minTickSize: [1, "month"]
            },
            hoverable: true
          });
        }, true);
      }
    };
  }
]);
                     //__               )
            //_  \    | _\             Q)  /
           /// \  \   /  (            Q)  /
          ///_ |     / _/     \ /     )       /|
   //\      \- |     |/       .V.    _       / |______
    //\      \_\_/---------_________/o\     /        /
            //( |                      |   / /|__   /_____
         //__/  |      _-____   /V-V-V-V    /   /     ___/
        //(      |   v |     \  \^_^_^          \    <______
  //___    \  )   \    v \    \_____)     |\ |\ \    _______\
         //( / __/  \  vv  \              | \| \|    \
         ///  \       \  vv  \            \       |\  \
        //( |  \ _      \      \           \  |\  | \  \
         //\ \   _)        \     \          \ | \ |  \ |
           //\   _)         |     |          \|  \|   \|
        ///    \__)       |\|    |
       ///        ^ /\  |\|/    /
                //\\__\_|/    /         TROGDOR
                 //\_________/            the
                      //|  |           BURNiNATOR
                      //|  |____
                      //|___
