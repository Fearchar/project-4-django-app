import requests
import re
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
                    'manaCost': '' if not 'manaCost' in card else ''.join(
                        [char for char in card['manaCost'] if char not in ('{', '}')]
                    ),
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
            return response

        mtga_sets = ['M20', 'WAR', 'RAA', 'RNA', 'GRN', 'DOM', 'RIX', 'XLN']
        for mtga_set in mtga_sets:
            response = saveCards(f'https://api.magicthegathering.io/v1/cards?set={mtga_set}&page=1')
            pages = re.search(r'page=\d+', response.headers['Link']).group()
            pages = int(pages.split('=')[1])
            for i in range(pages):
                saveCards(f'https://api.magicthegathering.io/v1/cards?set={mtga_set}&page={i+1}')
                print(f'Page {i+1} of {mtga_set}: Saved!')
