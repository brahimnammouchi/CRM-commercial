from dataclasses import fields
from pyexpat import model
from xmlrpc import client
from rest_framework import serializers
from setuptools import Command
from CommercialApp.models import Client, Product

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
class CommandSerializer(serializers.ModelSerializer):
    model = Command
    fields = '__all__'


