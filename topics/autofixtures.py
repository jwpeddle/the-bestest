import datetime
from autofixture import generators, register, AutoFixture

from topics import Vote


class DateTimeGenerator(generators.DateTimeGenerator):
    min_date = datetime.datetime(2011, 1, 1, 0, 0)
    max_date = datetime.datetime(2013, 1, 1, 0, 0)


class VoteAutoFixture(AutoFixture):
    field_values = {
        'date': generators.DateTimeGenerator(),
    }


register(Vote, VoteAutoFixture)
