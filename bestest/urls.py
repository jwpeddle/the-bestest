from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic.base import TemplateView
from tastypie.api import Api

from topics.api import TopicResource

admin.autodiscover()

api = Api(api_name='v1')
api.register(TopicResource())

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(api.urls)),
    url(r'', TemplateView.as_view(template_name='base.html'), name='home'),
)
