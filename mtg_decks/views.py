import math
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import User, Card, Deck, Game
from .serializers import UserSerializer, CardSerializer, DeckSerializer, GameSerializer

class UserList(APIView):

    def get(self, _request):
        users = User.objects.all()
        serialzer = UserSerializer(users, many=True)
        return Response(serialzer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()#user=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

class CardList(APIView):

    def get(self, request):
        page_size = 8
        cards = Card.objects.all()
        # !!! Needs to send some kind of response if send a querystring key tht doesn't exist on the model. It would also be better if it would search the model for it, because we're not really doing anyting with those properties on the front end
        for key in request.query_params:
            if key != 'cmc' and key in CardSerializer.Meta.fields:
                cards = cards.filter(
                    **{key + '__contains': request.query_params.get(key)}
                )
            elif key == 'cmc':
                cards = cards.filter(cmc=request.query_params.get(key))

        # if request.query_params.get('page') == 0:
        #     cards = cards.filter(manaCost__contains='{R}')
        page_count = math.floor(cards.count() / page_size)
        page_index = int(request.query_params.get('page'))
        if page_index > page_count:
            return Response({'error': 'Requested page does not exist.'}, status=404)
        if page_index is None:
            page_index = 0
        first_card_index = page_index * page_size

        serializer = CardSerializer(cards[first_card_index : first_card_index + page_size], many=True)
        return Response(serializer.data, headers={'Total-Pages': page_count})

    def post(self, request):
        serializer = CardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()#user=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

class DeckList(APIView):

    def get(self, _request):
        decks = Deck.objects.all()
        serialzer = DeckSerializer(decks, many=True)
        return Response(serialzer.data)

# !!! Needs to check if user is is_valid and possibly that they're the one signed in. I also need to check that the cards are valid. Should be simpler when auth is linked up
    def post(self, request):
        # !!! Consider changing for pk
        user = User.objects.get(username=request.data['created_by_pk'])
        serializer = DeckSerializer(data=request.data)
        if serializer.is_valid():
            cards = [Card.objects.get(pk=pk) for pk in request.data['card_pks']]
            serializer.save(created_by=user, cards=cards)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

class GameList(APIView):

    def get(self, _request):
        games = Game.objects.all()
        serialzer = GameSerializer(games, many=True)
        return Response(serialzer.data)

    def post(self, request):
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()#user=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)
