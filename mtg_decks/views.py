from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import User, Card, Deck, Game
from .serializers import UserSerializer, CardSerializer, WriteDeckSerializer, ReadDeckSerializer, GameSerializer

class UserList(APIView):

    def get(self, _request):
        users = User.objects.all()
        serialzer = UserSerializer(users, many=True)
        return Response(serialzer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

class CardList(APIView):

    def get(self, _request):
        cards = Card.objects.all()
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

class DeckList(APIView):

    def get(self, _request):
        decks = Deck.objects.all()
        serialzer = ReadDeckSerializer(decks, many=True)
        return Response(serialzer.data)

# !!! Needs to check if user is is_valid and possibly that they're the one signed in. I also need to check that the cards are valid. Should be simpler when auth is linked up
    def post(self, request):
        serializer = WriteDeckSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by=request.user)
            serializer = ReadDeckSerializer(serializer.instance)

            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

class DeckDetail(APIView):

    def get_deck(self, pk):
        try:
            deck = Deck.objects.get(pk=pk)
        except Deck.DoesNotExist:
            raise Http404
        return deck

    def get(self, _request, pk):
        deck = self.get_deck(pk)
        serializer = ReadDeckSerializer(deck)
        return Response(serializer.data)

    def put(self, request, pk):
        deck = self.get_deck(pk)
        write_serializer = WriteDeckSerializer(deck, data=request.data)
        if write_serializer.is_valid():
            deck = write_serializer.save()
            read_serializer = ReadDeckSerializer(deck)
            return Response(read_serializer.data, status=201)

        return Response(write_serializer.errors, status=422)

    def delete(self, _request, pk):
        movie = self.get_deck(pk)
        movie.delete()
        return Response(status=204)

class GameList(APIView):

    def get(self, _request):
        games = Game.objects.all()
        serialzer = GameSerializer(games, many=True)
        return Response(serialzer.data)

    def post(self, request):
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)
