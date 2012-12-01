from tastypie import fields
from tastypie.authentication import Authentication
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource

from topics.models import Entry, Topic, Vote


class EntryResource(ModelResource):
    class Meta:
        queryset = Entry.objects.all()
        authentication = Authentication()
        authorization = Authorization()


class TopicResource(ModelResource):
    class Meta:
        queryset = Topic.objects.all()
        authentication = Authentication()
        authorization = Authorization()


class VoteResource(ModelResource):
    class Meta:
        queryset = Vote.objects.all()
        authentication = Authentication()
        authorization = Authorization()
