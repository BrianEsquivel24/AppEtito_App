from rest_framework import serializers
from .models import Admin
from .models import User
from .models import Restaurants,Foods
from .models import Locations, PaymentMethod, Categories
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class LocationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locations
        fields = '__all__'

class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = '__all__'

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'


class RestaurantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurants
        fields = '__all__'

class FoodsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foods
        fields = '__all__'

class UserLoginSerializer(serializers.Serializer):
    nombre = serializers.CharField()
    password = serializers.CharField(write_only=True)
