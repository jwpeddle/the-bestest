from django.contrib import admin

from topics.models import Entry, Topic, Vote

admin.site.register(Entry)
admin.site.register(Topic)
admin.site.register(Vote)
