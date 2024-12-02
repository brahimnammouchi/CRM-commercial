from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from Activités import views as views2
from Login import *

urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),
    path('', include('Activités.urls')),
    path('', include('Login.urls')),
]
