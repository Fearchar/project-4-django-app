from django.contrib import admin

from .models import Player, Card, Deck, Game
# Register your models here.
admin.site.register(Player)
admin.site.register(Card)
admin.site.register(Deck)
admin.site.register(Game)
