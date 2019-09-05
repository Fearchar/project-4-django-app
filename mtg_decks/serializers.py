from rest_framework import serializers

from .models import User, Card, Deck, Game

class CardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Card
        fields = ('name', 'manaCost', 'cmc', 'type', 'rarity', 'set', 'text', 'imageUrl')

class DeckSerializer(serializers.ModelSerializer):

    class Meta:
        model = Deck
        fields = ('name', 'win_rate')

class GameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Game
        fields = ('name', 'win_rate', 'date_played')

class UserSerializer(serializers.ModelSerializer):
    games_played = GameSerializer(many=True)
    decks_created = DeckSerializer(many=True)
    decks_played = DeckSerializer(many=True)
    collection = CardSerializer(many=True)
    class Meta:
        model = User
        fields = ('username', 'games_played', 'decks_created', 'decks_played', 'collection')
