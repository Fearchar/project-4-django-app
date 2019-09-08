from django.urls import path

from .views import UserList, CardList, DeckList, GameList

urlpatterns = [
    path('users', UserList.as_view()),
    path('cards', CardList.as_view()),
    path('decks', DeckList.as_view()),
    path('games', GameList.as_view())
]
