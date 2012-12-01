App.factory('models', [
  '$resource',
  'TASTYPIE_BASE',
  function($resource, TASTYPIE_BASE) {
    var Topic,
        Entry;

    function toTastyResource(entity, id) {
      return TASTYPIE_BASE + entity + '/' + id;
    }

    Topic = $resource(TASTYPIE_BASE + 'topic/:topicId');

    Entry = $resource(TASTYPIE_BASE + 'entry/:entryId/');
    Entry.create = function(topicId, entry) {

      if (!topicId || !entry) throw new Error("Topic ID and answer are mandatory");

      Entry.save(
        {
          name: entry,
          topic_id: toTastyResource('topic', topicId)
        },
        function(response) {
          console.log("Created!");
        }
      );
    };

    return {
      Topic: Topic,
      Entry: Entry
    };
  }
  ]);
