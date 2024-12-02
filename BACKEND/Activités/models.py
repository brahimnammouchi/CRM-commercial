from django.db import models
from django.conf import settings
from CommercialApp.models import Client

devise_choice = (
    ("dinars", "dinars"),
    ("euro", "euro"),
    ("dollar", "dollar"),
)

phase_vente_choice = (
    ("en cours", "en cours"),
    ("A venir", "A venir"),
    ("En négociation", "En négociation"),
    ("Abandonnée", "Abandonnée"),
    ("gagnée", "gagnée"),
    ("perdue", "perdue")
)

commercial = (
    ("Colonel Nizar", "Colonel Nizar"),
    ("Ikram", "Adm/Chef Ikram"),
    ("Cne Radhouen", "Cne Radhouen"),
    ("Lt Sofienne", "Lt Sofienne"),
    ("Adj/C Brahim", "Adj/C Brahim"),
    ("Adj/M Chabchoub", "Adj/M Chabchoub"),
    ("Chef Imed", "Sgt/C Imed")
)

User = settings.AUTH_USER_MODEL

class rendez_vous(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    object = models.CharField(max_length=255)
    date_RendezVous = models.DateTimeField(null=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.client} {self.date_RendezVous} {self.completed}'

class AppelTelephonique(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    datetime = models.DateTimeField()  # Change to DateTimeField
    completed = models.BooleanField(default=False)

    def __str__(self):
        return str(self.client)

class ActionCommercial(models.Model):
    commercial = models.CharField(max_length=20, choices=commercial)
    nom_action = models.CharField(max_length=20)
    CA_esperer = models.IntegerField(blank=True, null=True)
    Cout_action = models.IntegerField(blank=True, null=True)
    But_action = models.CharField(max_length=55)
    debut_action = models.DateTimeField()
    echeance = models.DateTimeField(null=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return str(self.nom_action)

class Opportinite(models.Model):
    reference = models.CharField(max_length=10)
    ca_estime = models.BigIntegerField(blank=True, null=True)
    ca_final = models.BigIntegerField(blank=True, null=True)
    devise = models.CharField(max_length=20, choices=devise_choice)
    phase_de_vente = models.CharField(max_length=20, choices=phase_vente_choice)
    date_signature = models.DateField()  # Change to DateField without DateField
    document_concernee = models.FileField(blank=True, null=True, upload_to='documents/%Y/%m/%d/')
    completed = models.BooleanField(default=False)

class segment_marche(models.Model):
    nom_segment = models.CharField(max_length=55, null=False)
class Reclamation(models.Model):
    STATUT_CHOICES = [
        ('en_attente', 'En attente'),
        ('en_cours', 'En cours'),
        ('resolue', 'Résolue'),
        ('fermee', 'Fermée'),
    ]

    PRIORITE_CHOICES = [
        ('basse', 'Basse'),
        ('moyenne', 'Moyenne'),
        ('haute', 'Haute'),
    ]

    titre = models.CharField(max_length=100)
    description = models.TextField()
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='en_attente')
    priorite = models.CharField(max_length=20, choices=PRIORITE_CHOICES, default='moyenne')
    date_creation = models.DateTimeField(auto_now_add=True)
    date_mise_a_jour = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.titre} - {self.statut} - {self.priorite}"
class EmailCampaign(models.Model):
    name = models.CharField(max_length=100)
    subject = models.CharField(max_length=255)
    body = models.TextField()
    recipients = models.TextField(
        help_text="Enter recipient emails separated by commas"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def get_recipients_list(self):
        """Converts the comma-separated recipients string to a list."""
        return [email.strip() for email in self.recipients.split(",") if email.strip()]
class Facture(models.Model):
    montant = models.DecimalField(max_digits=10, decimal_places=2)
    date_facture = models.DateField()
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    def __str__(self):
        return f"Facture {self.id} - {self.client.nom}"