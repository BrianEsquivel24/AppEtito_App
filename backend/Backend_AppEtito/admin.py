from django.contrib import admin
from .models import Admin
from .models import User, Locations,PaymentMethod, Categories, Restaurants, Foods

@admin.register(Admin)
class Admin(admin.ModelAdmin):  # Nota: el nombre "AdminAdmin" es solo un ejemplo. Puedes nombrarlo como prefieras.
    list_display = ['id', 'nombre', 'address', 'email', 'password', 'phone_number', 'photo']  # Puedes personalizar los campos que quieres mostrar en la lista.

@admin.register(User)
class User(admin.ModelAdmin):  
    list_display = ['id', 'nombre', 'email', 'password', 'phone_number', 'photo']

@admin.register(Locations)
class Locations(admin.ModelAdmin):  
    list_display = ['id', 'address', 'addressNumber', 'user']

@admin.register(PaymentMethod)
class PaymentMethod(admin.ModelAdmin):  
    list_display = ['id', 'cardNumber', 'expiredDate', 'securityCode', 'user']

@admin.register(Categories)
class Categories(admin.ModelAdmin):  
    list_display = ['id', 'name', 'description', 'image']


@admin.register(Restaurants)
class Restaurants(admin.ModelAdmin):  
    list_display = ['id', 'name', 'description', 'categories', 'image']

@admin.register(Foods)
class Foods(admin.ModelAdmin):  
    list_display = ['id', 'name', 'description', 'price', 'restaurant', 'image']