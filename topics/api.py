from tastypie import fields
from tastypie.resources import ModelResource

from topics.models import Topic


class TopicResource(ModelResource):
    class Meta:
        queryset = Topic.objects.all()
