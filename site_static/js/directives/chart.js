App.directive('chart', [
  function() {
    return {
      restrict: 'E',
      templateUrl: '/static/templates/chart.html',
      link: function(scope, elem, attrs) {
        scope.$watch(attrs.topic, function(topic) {
          //if (topic && topic.entries) {
            //for (var e = 0; e < topic.entries.length; e++) {
              //var entry = topic.entries[e]; 
              //var aggregate = [];
              //for (var v = 0; v < entry.votes.length; v++) {
                //var vote = entry.votes[v];
                //var mdate = moment(vote.date);
                //aggregate.push(mdate.format('YYYY-MM'));
              //}
              //console.log(_.countBy(aggregate, function(mdate){return mdate}));
            //}
          //}
        }, true);
      }
    }
  }
]);
