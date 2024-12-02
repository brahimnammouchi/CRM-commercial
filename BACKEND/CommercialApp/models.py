from django.db import models

class Client (models.Model):
    nom = models.CharField(max_length=20)
    prenom=models.CharField(max_length=20)
    MatruculeFiscal= models.CharField(max_length=10)
    adresse=models.CharField(max_length=50)
    email=models.EmailField(max_length=20)
    def __str__(self):
        #it will return the title
        return self.nom

class Product(models.Model):
    id = models.AutoField(primary_key=True)  # Remove default='1'
    name = models.CharField(max_length=200, null=True)
    price = models.FloatField()
    digital = models.BooleanField(default=False, null=True, blank=False)
    image = models.ImageField(null=True, blank=True)
    description = models.CharField(max_length=500, null=True, blank=True)

    def __str__(self):
        return self.name

class Commande(models.Model):
    id = models.AutoField(primary_key=True)  # Remove default='1'
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    produit = models.ForeignKey(Product, on_delete=models.CASCADE)
    qte = models.IntegerField(null=False, default=0)



