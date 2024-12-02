from django.contrib import admin
from django.db import router
from django.urls import path, include


urlpatterns= [
    path ( 'api/', include(router.urls)),
    path('admin/', admin.site.urls),
   
]