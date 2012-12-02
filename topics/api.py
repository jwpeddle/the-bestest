from tastypie import fields
from tastypie.authentication import Authentication
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource

from topics.models import Entry, Topic, Vote, Tag


class EntryResource(ModelResource):
    votes = fields.ToManyField('topics.api.VoteResource', 'votes', full=True, null=True)
    topic_id = fields.ToOneField('topics.api.TopicResource', 'topic')

    def dehydrate(self, bundle):
        bundle.data['number_of_votes'] = bundle.obj.number_of_votes
        return bundle

    class Meta:
        queryset = Entry.objects.all()
        authentication = Authentication()
        authorization = Authorization()
        always_return_data = True


class TopicResource(ModelResource):
    entries = fields.ToManyField('topics.api.EntryResource', 'entries', full=True)
    tags = fields.ToManyField('topics.api.TagResource', 'tags', full=True, null=True)

    class Meta:
        queryset = Topic.objects.all()
        authentication = Authentication()
        authorization = Authorization()
        always_return_data = True


class VoteResource(ModelResource):
    entry_id = fields.ToOneField('topics.api.EntryResource', 'entry')

    class Meta:
        queryset = Vote.objects.all()
        authentication = Authentication()
        authorization = Authorization()
        always_return_data = True


class TagResource(ModelResource):
    topics = fields.ToManyField('topics.api.TopicResource', 'topics')

    class Meta:
        queryset = Tag.objects.all()
        authentication = Authentication()
        authorization = Authorization()
        always_return_data = True
