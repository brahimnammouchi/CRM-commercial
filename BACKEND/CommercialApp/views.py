from multiprocessing.connection import Client
from CommercialApp.models import Client,Commande,Product
from .serializers import ClientSerializer,ProductSerializer,CommandSerializer
from.models import Client,Commande,Product
from rest_framework.viewsets import ModelViewSet

    
    #########################
# class  CBV_pk(APIView):
    
#     def get_object(self, id):
#         try:
#             return Client.objects.get(id=id)
#         except Client.DoesNotExists:
#             raise Http404
#     def get(self, request, id):
#         client = self.get_object(id)
#         serializer = ClientSerializer(client)
#         return Response(serializer.data)
#     def put(self, request, id):
#         client = self.get_object(id)
#         serializer = ClientSerializer(client, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     def delete(self, request, id):
#         client = self.get_object(id)
#         client.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
class Client_ViewSet(ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()

class Commande_ViewSet(ModelViewSet):
    serializer_class = CommandSerializer
    queryset = Commande.objects.all()

class Product_ViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
