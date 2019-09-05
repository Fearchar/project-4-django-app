from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Card
from .serializers import CardSerializer

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
