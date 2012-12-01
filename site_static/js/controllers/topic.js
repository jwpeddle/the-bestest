App.controller('TopicCtrl', [
  '$scope',
  '$routeParams',
  'models',
  function($scope, $routeParams, models) {

    var HARDCODED_SAMPLE_DATA = {
      id: 1,
      name: "What is the best WAY TO SURVIVE A HACKATHON",
      entries: [
        {entry: "Caffeine Pills", votes: 1000},
        {entry: "Red Devil", votes: 900},
        {entry: "Tim Hortons coffee", votes: 852},
        {entry: "Coke", votes: 600}
      ]
    };

    $scope.topic = models.Topic.get({topicId: $routeParams.topic_id}, function() {
      //TODO Fake data till we have the backend working
      $scope.topic = HARDCODED_SAMPLE_DATA;
    });

    $scope.addNewEntry = function(entry) {
      models.Entry.create($routeParams.topic_id, entry);
    };
  }
]);
