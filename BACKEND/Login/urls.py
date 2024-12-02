from django.contrib import admin
from django.db import router
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path
from .views import login_view

urlpatterns = [
    path('api/login/', login_view, name='login'),
]


#router.register(r'Client',ClientSerializer)

#router.register('RendezVous',RDV_ViewSet )

#router.register('RDV',API_RDV.as_view())

