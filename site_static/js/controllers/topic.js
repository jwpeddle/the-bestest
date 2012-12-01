App.controller('TopicCtrl', [
  '$scope',
  '$routeParams',
  'models',
  function($scope, $routeParams, models) {

    var HARDCODED_SAMPLE_DATA = {
      id: 1,
      name: "What is the best WAY TO SURVIVE A HACKATHON",
      answers: [
        {answer: "Caffeine Pills", votes: 1000},
        {answer: "Red Devil", votes: 900},
        {answer: "Tim Hortons coffee", votes: 852},
        {answer: "Coke", votes: 600}
      ]
    };

    $scope.topic = models.Topic.get({topicId: $routeParams.topic_id}, function() {
      //TODO Fake data till we have the backend working
      $scope.topic = HARDCODED_SAMPLE_DATA;
    });
  }
]);
