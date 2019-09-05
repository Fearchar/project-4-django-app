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

    def get(self, _request):
        cards = Card.objects.all()
        serialzer = CardSerializer(cards, many=True)
        return Response(serialzer.data)

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

    def post(self, request):
        serializer = DeckSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()#user=request.user)
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
