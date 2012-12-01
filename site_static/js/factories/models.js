App.factory('models', [
  '$resource',
  'TASTYPIE_BASE',
  function($resource, TASTYPIE_BASE) {
    var Topic = $resource(TASTYPIE_BASE + '/topic/:topicId');

    return {
      Topic: Topic
    };
  }
  ]);
