import requests
from django.core.management.base import BaseCommand, CommandError
# from mtg_decks.models import Card
from mtg_decks.serializers import CardSerializer

class Command(BaseCommand):
    help = 'HELP'

    def handle(self, *args, **options):
        def saveCards(url):
            response = requests.get(url)
            cards = response.json()['cards']
            for card in cards:
                card = {
                    'name': card['name'],
                    'manaCost': '' if not 'manaCost' in card else card['manaCost'],
                    'cmc': card['cmc'],
                    'type': card['type'],
                    'rarity': card['rarity'],
                    'set': card['set'],
                    'text': '' if not 'text' in card else card['text'],
                    'imageUrl': '' if not 'imageUrl' in card else card['imageUrl']
                }
                serialzer = CardSerializer(data=card)
                if serialzer.is_valid():
                    serialzer.save()
                    card_name = card['name']
                    print(f'Card {card_name}: Saved!')

        for i in range(4):
            saveCards(f'https://api.magicthegathering.io/v1/cards?set=M20&page={i+1}')
            print(f'Page {i+1}: Saved!')
