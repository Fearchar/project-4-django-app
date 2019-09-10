from rest_framework import serializers
from django.db import connection
from .models import User, Card, Deck, Game

class UsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class CardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Card
        # !!! At the moment most of these fields are just being used to search, which we're expecting to do on the backend. Consider removing all but imageUrl
        fields = ('id', 'name', 'manaCost', 'cmc', 'type', 'rarity', 'set', 'text', 'imageUrl')


class ReadDeckSerializer(serializers.ModelSerializer):
    created_by = UsernameSerializer(read_only=True)
    cards = CardSerializer(many=True, read_only=True)

    class Meta:
        model = Deck
        fields = ('id', 'name', 'created_by', 'win_rate', 'imageUrl', 'cards')


class WriteDeckSerializer(serializers.ModelSerializer):


    class Meta:
        model = Deck
        fields = ('id', 'name', 'win_rate', 'imageUrl', 'cards')

    def create(self, validated_data):
        cards = validated_data.pop('cards')
        instance = Deck.objects.create(**validated_data)

        insert_command = 'INSERT INTO mtg_decks_deck_cards (deck_id, card_id) VALUES '

        insert_command += ','.join([f'({instance.id}, {card.id})' for card in cards])

        with connection.cursor() as cursor:
            cursor.execute(insert_command)

        return instance

    def update(self, instance, validated_data):
        cards = validated_data.pop('cards')
        instance.name = validated_data.get('name', instance.name)
        instance.win_rate = validated_data.get('win_rate', instance.win_rate)
        instance.imageUrl = validated_data.get('imageUrl', instance.imageUrl)

        delete_command = f'DELETE FROM mtg_decks_deck_cards WHERE deck_id = {instance.id}'


        insert_command = 'INSERT INTO mtg_decks_deck_cards (deck_id, card_id) VALUES '

        insert_command += ','.join([f'({instance.id}, {card.id})' for card in cards])

        with connection.cursor() as cursor:
            cursor.execute(delete_command)
            cursor.execute(insert_command)

        instance.save()
        return instance

class GameSerializer(serializers.ModelSerializer):
    decks = ReadDeckSerializer()

    class Meta:
        model = Game
        fields = ('id', 'decks', 'date_played')

class UserSerializer(serializers.ModelSerializer):
    games_played = GameSerializer(many=True)
    decks_created = ReadDeckSerializer(many=True)
    decks_played = ReadDeckSerializer(many=True)
    collection = CardSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'games_played', 'decks_created', 'decks_played', 'collection')
