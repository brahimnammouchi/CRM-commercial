from django.db import router
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from .views import ActionCom_ViewSet, Email_Viewset, Opportinite_ViewSet, SegmentMarche_ViewSet,Reclamation_ViewSet
from .views import RDV_ViewSet, ActionCom_ViewSet
from Activités import views
from CommercialApp import views as views2
from django.urls import path, include
router = DefaultRouter()
router.register(r'AppelTel',views.AppelTel_ViewSet, 'AppelTel')
router.register(r'Action',ActionCom_ViewSet)
router.register(r'Opportinite',Opportinite_ViewSet)
router.register(r'SegmentMarche', SegmentMarche_ViewSet)
router.register(r'Client', views2.Client_ViewSet)
router.register(r'Produit', views2.Product_ViewSet) 
router.register(r'Commande', views2.Commande_ViewSet)
router.register(r'RendezVous',RDV_ViewSet)
router.register(r'Reclamation',Reclamation_ViewSet)
router.register(r'EmailCompaign',Email_Viewset)
router.register(r'Facture', views.Facture_ViewSet)

#router.register(r'Client',ClientSerializer)

#router.register('RendezVous',RDV_ViewSet )

#router.register('RDV',API_RDV.as_view())

urlpatterns= [
    path ( 'api/', include(router.urls)),
    path('admin/', admin.site.urls),

    
]