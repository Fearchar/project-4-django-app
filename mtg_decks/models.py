from django.db import models
from django.contrib.auth.models import User

class Card(models.Model):
    name = models.CharField(max_length=50)
    manaCost = models.CharField(max_length=50)
    cmc = models.FloatField()
    type = models.CharField(max_length=100)
    rarity = models.CharField(max_length=20)
    set = models.CharField(max_length=50)
    text = models.CharField(max_length=800)
    imageUrl = models.CharField(max_length=300, blank=True)

    unique_together = [name, set]

    def __str__(self):
        return f'{self.name} - {self.type} - {self.rarity} ({self.set})'

class Deck(models.Model):
    name = models.CharField(max_length=50)
    cards = models.ManyToManyField(Card, related_name='decks')
    win_rate = models.FloatField()
    users = models.ManyToManyField(User, related_name='decks_played')
    created_by = models.ForeignKey(User, null=True, related_name='decks_created', on_delete=models.SET_NULL)

    def __str__(self):
        return f'{self.name} ({self.created_by})'

class Game(models.Model):
    created_by = models.ManyToManyField(User, related_name='games_created')
    Users = models.ManyToManyField(User, related_name='games_played')
    decks = models.ManyToManyField(Deck, related_name='games')
    date_played = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.created_by} ({self.date_played})'
