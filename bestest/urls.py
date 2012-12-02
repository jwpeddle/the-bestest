import autofixture
from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic import RedirectView, TemplateView
from tastypie.api import Api

from topics.api import EntryResource, TopicResource, VoteResource, TagResource

admin.autodiscover()
autofixture.autodiscover()

api = Api(api_name='v1')
api.register(EntryResource())
api.register(TopicResource())
api.register(VoteResource())
api.register(TagResource())

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(api.urls)),
    url(r'^$', RedirectView.as_view(url='/1')),
    url(r'', TemplateView.as_view(template_name='base.html'), name='home'),
)
