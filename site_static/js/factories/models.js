App.factory('models', [
  '$resource',
  '$http',
  '$rootScope',
  'TASTYPIE_BASE',
  function($resource, $http, $rootScope, TASTYPIE_BASE) {
    var Topic,
        Entry,
        Vote,
        Tag;

    function toTastyResource(entity, id) {
      return TASTYPIE_BASE + entity + '/' + id;
    }

    Topic = $resource(TASTYPIE_BASE + 'topic/:topicId');
    Topic.removeTag = function(topic, tag) {
      var tags;

      if (!topic || !tag) throw new Error("Topic and tag are mandatory");

      tags = _.filter(topic.tags, function(t) {
        return t.name !== tag.name;
      });

      $http.put(toTastyResource('topic', topic.id), {
        tags: _.map(tags, function(tag) {return toTastyResource('tag', tag.id);}),
        entries: topic.entries
      }).success(function(response) {
        console.log("Deleted tag from topic");
      });
    };

    Entry = $resource(TASTYPIE_BASE + 'entry/:entryId/');
    Entry.create = function(topicId, entry) {

      if (!topicId || !entry) throw new Error("Topic ID and answer are mandatory");

      $rootScope.$broadcast('bestest.models.entry.willCreate', entry);

      Entry.save(
        {
          name: entry,
          topic_id: toTastyResource('topic', topicId)
        },
        function(response) {

        }
      );
    };

    Vote = $resource(TASTYPIE_BASE + 'vote/:voteId');
    Vote.create = function(entryId) {

      if (!entryId) throw new Error("Answer ID is mandatory");

      $rootScope.$broadcast('bestest.models.vote.willCreate');

      Vote.save(
      {
        entry_id: toTastyResource('entry', entryId)
      },
      function(response) {

      }
      );
    };

    Tag = $resource(TASTYPIE_BASE + 'tag/:tagId/');
    Tag.create = function(topicId, tag) {

      if (!topicId || !tag) throw new Error("Topic ID is mandatory");

      $rootScope.$broadcast('bestest.models.tag.willCreate', tag);

      Tag.save(
        {
          name: tag,
          topic_id: toTastyResource('topic', topicId)
        },
        function(response) {

        }
      );
    };

    return {
      Topic: Topic,
      Entry: Entry,
      Vote: Vote,
      Tag: Tag
    };
  }
  ]);
