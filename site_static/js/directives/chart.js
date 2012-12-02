App.directive('chart', [
  '$http',
  function($http) {
    return {
      restrict: 'E',
      link: function(scope, elem, attrs) {
        scope.$watch(attrs.topic, function(topic) {
          if (topic && topic.entries) {
            var entries = angular.copy(topic.entries);
            entries = _.sortBy(entries, function(entry){ return -entry.number_of_votes; });
            entries = entries.slice(0, 3);
            var aggregates = [];

            for (var e = 0; e < entries.length; e++) {
              var entry = entries[e];
              var votes = $http.get(
                '/api/v1/vote', {
                  params: {entry_id: entry.id},
                })
                .success((function(entry) {
                  return function(response) {
                    entry.votes = response.objects;
                    var aggregate = [];

                    for (var v = 0; v < entry.votes.length; v++) {
                      var vote = entry.votes[v];
                      var mdate = moment(vote.date);
                      aggregate.push(mdate.format('YYYYMM'));
                    }

                    aggregate = _.countBy(aggregate, function(yyyymm){return moment(yyyymm, 'YYYYMM').valueOf()});
                    aggregate = _.map(aggregate, function(value, key){return [key, value * 10]});
                    aggregates.push({
                      'label': entry.name,
                      'data': aggregate
                    });
                    if (aggregates.length == entries.length) {
                      $.plot(elem.find('.chart'), aggregates, {
                        xaxis: {
                          mode: "time",
                          minTickSize: [1, "month"]
                        },
                        hoverable: true
                      });
                    }
                  }
                })(entry)
              );
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
