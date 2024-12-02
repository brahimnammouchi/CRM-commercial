from django.contrib import admin
from django.urls import path, include, re_path
from CommercialApp import views
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from Activités import views as views2

urlpatterns = [
    path('admin/', admin.site.urls),
     #CRUD API CLIENT
    path('', include('Activités.urls')),
    # path('REST/RDVAPI/<int:id>', views2.API_RDV.as_view()),
   # path('REST/AppelTel_API/<int:id>',views2.API_AppelTel.as_view()),

]
