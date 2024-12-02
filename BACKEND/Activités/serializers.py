from dataclasses import field, fields
from pyexpat import model
from rest_framework import serializers
from .models import *


class RendezVousSerializer(serializers.ModelSerializer):
    class Meta:
        model = rendez_vous
        fields = '__all__'
class AppelTelephoniqueSerializer(serializers.ModelSerializer):
    class Meta:
        model= AppelTelephonique
        fields = '__all__'
class ActioncommercialSerializer(serializers.ModelSerializer):
    class Meta:
        model= ActionCommercial
        fields = '__all__'
class opportiniteSerializer(serializers.ModelSerializer):
     class Meta:
        model = Opportinite
        fields = '__all__'
class SegmentMarcheSerializer(serializers.ModelSerializer):
     class Meta:
        model = segment_marche
        fields = '__all__'
class ReclamationSerializer(serializers.ModelSerializer):
     class Meta:
        model = Reclamation
        fields = '__all__'
class EmailCompaignSerializer(serializers.ModelSerializer):
     class Meta:
        model = EmailCampaign
        fields = '__all__'
class FactureSerializer(serializers.ModelSerializer):
    model = Facture
    fields = '__all__'