from django.db import models

# Create your models here.
class Card(models.Model):
    name = models.CharField(max_length=50)
    manaCost = models.CharField(max_length=50)
    cmc = models.FloatField()
    type = models.CharField(max_length=100)
    rarity = models.CharField(max_length=20)
    set = models.CharField(max_length=3)
    text = models.CharField(max_length=800)
    image = models.CharField(max_length=300, blank=True)

    def __str__(self):
        return f'{self.name} - {self.type} - {self.rarity} ({self.set})'
