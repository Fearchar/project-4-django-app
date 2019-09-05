from django.urls import path

from .views import PlayerList, CardList, DeckList, GameList

urlpatterns = [
    path('players/', PlayerList.as_view()),
    path('cards/', CardList.as_view()),
    path('decks/', DeckList.as_view()),
    path('games/', GameList.as_view()),
]
