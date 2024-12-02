from rest_framework.viewsets import ModelViewSet
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,viewsets
from django.http import Http404
from rest_framework.decorators import api_view
from .models import ActionCommercial, AppelTelephonique, Opportinite, rendez_vous, segment_marche,Reclamation,EmailCampaign,Facture
from .serializers import ActioncommercialSerializer, AppelTelephoniqueSerializer, RendezVousSerializer, SegmentMarcheSerializer, opportiniteSerializer, FactureSerializer
from .models import ActionCommercial, AppelTelephonique, rendez_vous
from .serializers import ActioncommercialSerializer, AppelTelephoniqueSerializer, RendezVousSerializer,EmailCompaignSerializer,ReclamationSerializer

class RDV_ViewSet(ModelViewSet):
    serializer_class = RendezVousSerializer
    queryset = rendez_vous.objects.all()
    def delete(self,  request, id):
        rendez_vous = self.get_object(id)
        rendez_vous.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class AppelTel_ViewSet(ModelViewSet):
    serializer_class = AppelTelephoniqueSerializer
    queryset = AppelTelephonique.objects.all()
    def delete(self, request, id):
        AppelTelephonique = self.get_object(id)
        AppelTelephonique.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
#API Action Commercial
class ActionCom_ViewSet(ModelViewSet):
    serializer_class = ActioncommercialSerializer
    queryset = ActionCommercial.objects.all()
class Opportinite_ViewSet(ModelViewSet):
    serializer_class = opportiniteSerializer
    queryset = Opportinite.objects.all()
class SegmentMarche_ViewSet(ModelViewSet):
    serializer_class = SegmentMarcheSerializer
    queryset = segment_marche.objects.all()
class Reclamation_ViewSet(ModelViewSet):
    serializer_class = ReclamationSerializer
    queryset = Reclamation.objects.all()
class Email_Viewset(ModelViewSet):
    serializer_class = EmailCompaignSerializer
    queryset = EmailCampaign.objects.all()
class Facture_ViewSet(ModelViewSet):
    queryset = Facture.objects.all()
    serializer_class = FactureSerializer