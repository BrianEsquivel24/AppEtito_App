from django.db import models

#1. models
#2. serializers
#3. views
#4. urls
#5. admins
#5. python manage.py makemigrations
#6 python manage.py migrate
#7 python manage.py runserver

#Admin_Model
class Admin(models.Model):
    nombre = models.CharField(max_length=100)
    address = models.CharField(max_length=250)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    photo = models.ImageField(upload_to='photos/', null=True, blank=True)

class User(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    photo = models.ImageField(upload_to='photos/', null=True, blank=True)

class Locations(models.Model):
    address = models.CharField(max_length=100)
    addressNumber = models.CharField(max_length=10)
    description = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class PaymentMethod(models.Model):
    cardNumber = models.CharField(max_length= 20)
    expiredDate = models.DateField()
    securityCode = models.CharField(max_length= 3)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Categories(models.Model):
    name = models.CharField(max_length= 50)
    description = models.CharField(max_length= 100)
    image = models.ImageField(upload_to='photos/', null=True, blank=True)
  
class Restaurants(models.Model):
    name = models.CharField(max_length= 100)
    description = models.CharField(max_length=100)
    Location = models.CharField(max_length=200)
    branches = models.CharField(max_length=10)
    image = models.ImageField(upload_to='photos/', default='path_to_default_image.jpg', null=True, blank=True)
    categories = models.ForeignKey(Categories, on_delete=models.CASCADE)
   

class Foods(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    price = models.IntegerField()
    image = models.ImageField(upload_to='photos/', default='path_to_default_image.jpg', null=True, blank=True)
    restaurant = models.ForeignKey(Restaurants, on_delete=models.CASCADE)
    


