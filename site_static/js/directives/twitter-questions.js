App.directive('twitterQuestions',['$filter',function($filter){
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      scope.tweets = [
          {handle:'mediocreventure', quote: 'If I were to get an e-reader thingamajig, what is the best cheapest one? And also can I put PDFs on them?'},
          {handle:'_amberrx0', quote: 'What is the best color for a car?'},
          {handle:'BellaKamarudin', quote: 'What is the best way to deal with stress? — eat chocolate'}
        ];

      function wrapA( str ) {
          return '<a href="' + str + '">' + str + '<\/a>';
      };
      function wrapStrong( str ) {
          return '<strong>' + str + '<\/strong>';
      };

      scope.parseTweet = function (tweet) {
        return tweet.replace(/\bhttp[^ ]+/ig, wrapA).replace(/\bwhat is the best+/ig, wrapStrong);
      };
    }
  }
}]);
