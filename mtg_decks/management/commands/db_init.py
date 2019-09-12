import re
import requests
from django.core.management.base import BaseCommand
from mtg_decks.serializers import CardSerializer

class Command(BaseCommand):
    help = 'HELP'

    def handle(self, *_args, **_kwargs):
        def getCards(url):
            response = requests.get(url)
            cards = response.json()['cards']
            modified_cards = []
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
                modified_cards.append(card)

            return {'response': response, 'cards': modified_cards}

        def saveCards(cards):
            cards = sorted(cards, key=lambda card: card['name'])
            for i, _key in enumerate(cards):
                if cards[i]['name'] != cards[i-1]['name']:
                    serialzer = CardSerializer(data=cards[i])
                    if serialzer.is_valid():
                        serialzer.save()

        mtga_sets = ['M19', 'M20', 'WAR', 'RAA', 'RNA', 'GRN', 'DOM', 'RIX', 'XLN']
        for mtga_set in mtga_sets:
            card_data = getCards(f'https://api.magicthegathering.io/v1/cards?set={mtga_set}&page=1')
            response = card_data['response']
            cards = card_data['cards']
            pages = re.search(r'page=\d+', response.headers['Link']).group()
            pages = int(pages.split('=')[1])
            for i in range(pages):
                cards += getCards(f'https://api.magicthegathering.io/v1/cards?set={mtga_set}&page={i+1}')['cards']
                print(f'Page {i+1} of {mtga_set}: Saved!')
            saveCards(cards)
