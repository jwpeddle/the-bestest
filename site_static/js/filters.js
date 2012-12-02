App.filter('lastVoted', function(){
  return function(entry) {
    var lastVote = "";

    if (!entry || !entry.votes || !entry.votes.length) return "";

    _.each(entry.votes, function(i) {
      if (i.date > lastVote) {
        lastVote = i.date;
      }
    });

    return moment(lastVote).fromNow();
  };
});

App.filter('momentDate', function() {
  return function(date) {
    if (!date) return "";

    return moment(date).fromNow();
  };
});
