from django.db import models


class Topic(models.Model):
    name = models.CharField(max_length=20)

    def __unicode__(self):
        return self.name


class Entry(models.Model):
    name = models.CharField(max_length=30)
    topic = models.ForeignKey(Topic, related_name='entries')

    def __unicode__(self):
        return self.name

    @property
    def number_of_votes(self):
        return self.votes.count()


class Vote(models.Model):
    entry = models.ForeignKey(Entry, related_name='votes')
    date = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return "%s (%s)" % (self.entry.name, self.date)


class Tag(models.Model):
    name = models.CharField(max_length=20)
    topics = models.ManyToManyField(Topic, related_name='tags')
