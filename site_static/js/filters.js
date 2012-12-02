App.filter('lastVoted', function(){
  return function(entry) {
    var lastVote = "";

    if (!entry || !entry.votes) return "";

    _.each(entry.votes, function(i) {
      if (i.date > lastVote) {
        lastVote = i.date;
      }
    });

    return lastVote;
  };
});
