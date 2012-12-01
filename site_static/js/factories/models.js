App.factory('models', [
  '$resource',
  'TASTYPIE_BASE',
  function($resource, TASTYPIE_BASE) {
    var Topic,
        Answer;

    Topic = $resource(TASTYPIE_BASE + '/topic/:topicId');

    Answer = $resource(TASTYPIE_BASE + '/answer/:answerId');
    Answer.create = function(topicId, answer) {

      if (!topicId || !answer) throw new Error("Topic ID and answer are mandatory");

      models.Answer.save(
        {name: answer, topic_id: topicId},
        function(response) {
          console.log("Created!");
        }
      );
    };

    return {
      Topic: Topic,
      Answer: Answer
    };
  }
  ]);
