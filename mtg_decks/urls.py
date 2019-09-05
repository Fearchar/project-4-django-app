from django.urls import path

from .views import CardList

urlpatterns = [
    path('cards/', CardList.as_view()),
]
