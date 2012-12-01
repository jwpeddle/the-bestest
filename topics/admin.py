from django.contrib import admin

from topics.models import Entry, Topic, Vote


class EntryInline(admin.TabularInline):
    model = Entry


class VoteInline(admin.TabularInline):
    model = Vote


class EntryAdmin(admin.ModelAdmin):
    inlines = [VoteInline]


class TopicAdmin(admin.ModelAdmin):
    inlines = [EntryInline]


admin.site.register(Entry, EntryAdmin)
admin.site.register(Topic, TopicAdmin)
admin.site.register(Vote)
