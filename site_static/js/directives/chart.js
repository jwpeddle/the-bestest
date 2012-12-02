App.directive('chart', [
  '$http',
  function($http) {
    return {
      restrict: 'E',
      link: function(scope, elem, attrs) {
        scope.$watch(attrs.topic, function(topic) {
          if (topic && topic.entries) {
            var entries = topic.entries.slice(0, 3);
            for (var e = 0; e < entries.length; e++) {
              var entry = angular.copy(entries[e]);
              var votes = $http.get('/api/v1/vote', {
                params: {entry_id: entry.id},
              })
              .success(function(response) {
                entry.votes = response.objects;
                var aggregate = [];
                for (var v = 0; v < entry.votes.length; v++) {
                  var vote = entry.votes[v];
                  var mdate = moment(vote.date);
                  aggregate.push(mdate.format('YYYYMM'));
                }
                aggregate = _.countBy(aggregate, function(yyyymm){return moment(yyyymm, 'YYYYMM').valueOf()});
                aggregate = _.map(aggregate, function(value, key){return [key, value * 10]});
                $.plot(elem.find('.chart'), [aggregate], {xaxis: {mode: "time", minTickSize: [1, "month"]}});
              });
            }
          }
        }, true);
      }
    }
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
