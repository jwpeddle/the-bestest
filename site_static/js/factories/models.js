App.factory('models', [
  '$resource',
  '$rootScope',
  'TASTYPIE_BASE',
  function($resource, $rootScope, TASTYPIE_BASE) {
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
          $rootScope.$broadcast('bestest.models.entry.created', response);
        }
      );
    };

    Vote = $resource(TASTYPIE_BASE + 'vote/:voteId');
    Vote.create = function(entryId) {

      if (!entryId) throw new Error("Answer ID is mandatory");

      Vote.save(
      {
        entry_id: toTastyResource('entry', entryId)
      },
      function(response) {
        $rootScope.$broadcast('bestest.models.vote.created', response);
      }
      );
    };

    return {
      Topic: Topic,
      Entry: Entry,
      Vote: Vote
    };
  }
  ]);
