App.factory('topicService', [
  function() {

    // TODO validation
    function isYear(value) {
      return !!value;
    }

    // TODO validation
    function isMonth(value) {
      return !!value;
    }

    function filterByYear(entries, year) {
      _.each(entries, function(entry) {
        entry.votes = _.filter(entry.votes, function(vote) {
          return vote.date.substr(0, 4) == year;
        });
        entry.number_of_votes = entry.votes.length;
      });
      return entries;
    }

    function filterByMonth(entries, year, month) {
      _.each(entries, function(entry) {
        entry.votes = _.filter(entry.votes, function(vote) {
          return vote.date.substr(0, 4) == year && vote.date.substr(5, 2) == month;
        });
        entry.number_of_votes = entry.votes.length;
      });
      return entries;
    }

    function applyFilters(entries, year, month) {
      if (!!year && !!month) {
        return filterByMonth(entries, year, month);

      } else if (!!year) {
        return filterByYear(entries, year);

      } else {
        return entries;
      }
    }

    return {
      isYear: isYear,
      isMonth: isMonth,
      applyFilters: applyFilters
    };
  }
]);
