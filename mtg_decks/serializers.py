from rest_framework import serializers

from .models import User, Card, Deck, Game

class UsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class CardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Card
        fields = ('id', 'name', 'manaCost', 'cmc', 'type', 'rarity', 'set', 'text', 'imageUrl')

class DeckSerializer(serializers.ModelSerializer):
    created_by = UsernameSerializer(read_only=True)
    cards = CardSerializer(many=True, read_only=True)

    class Meta:
        model = Deck
        fields = ('id', 'name', 'created_by', 'win_rate', 'cards')

class GameSerializer(serializers.ModelSerializer):
    decks = DeckSerializer()

    class Meta:
        model = Game
        fields = ('id', 'decks', 'date_played')

class UserSerializer(serializers.ModelSerializer):
    games_played = GameSerializer(many=True)
    decks_created = DeckSerializer(many=True)
    decks_played = DeckSerializer(many=True)
    collection = CardSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'games_played', 'decks_created', 'decks_played', 'collection')
