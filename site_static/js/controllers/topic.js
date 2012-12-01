App.controller('TopicCtrl', [
  '$scope',
  '$routeParams',
  function($scope, $routeParams) {

    var HARDCODED_SAMPLE_DATA = [
      {answer: "Caffeine Pills", votes: 1000},
      {answer: "Red Devil", votes: 900},
      {answer: "Tim Hortons coffee", votes: 852},
      {answer: "Coke", votes: 600}
    ];

    $scope.answers = HARDCODED_SAMPLE_DATA;
    $scope.topicName = "What is the best WAY TO SURVICE A HACKATHON?";

    $scope.topicId = $routeParams.topic_id;
  }
]);
