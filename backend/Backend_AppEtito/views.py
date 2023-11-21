from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.contrib.auth.hashers import check_password
from rest_framework.views import APIView
from .utils import get_user_role  
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action



from .models import Admin, User, Locations,PaymentMethod, Categories, Restaurants, Foods, Orders
from .serializers import AdminSerializer
from .serializers import UserSerializer, OrdersSerializer
from .serializers import UserLoginSerializer
from .serializers import LocationsSerializer, PaymentMethodSerializer, CategoriesSerializer, RestaurantsSerializer, FoodsSerializer


class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

    # Método para manejar la actualización de un objeto Admin
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
        
        
        # Método para manejar la eliminación de un objeto Admin
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()  # Obtiene la instancia del objeto Admin
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

class LocationsViewSet(viewsets.ModelViewSet):
    queryset = Locations.objects.all()
    serializer_class = LocationsSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['get'])
    def print_locations_per_user(self, request, pk=None):
        user = get_object_or_404(User, id=pk)
        location = Locations.objects.filter(user_id=user)
        
        # Serializar los datos utilizando el serializador
        serializer = LocationsSerializer(location, many=True)
        data = serializer.data

        # Formato de salida, puedes adaptarlo según tus necesidades
        response_data = {
            'locations': data
        }

        return Response(response_data)

    

class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['get'])
    def print_card_per_user(self, request, pk=None):
        user = get_object_or_404(User, id=pk)
        card = PaymentMethod.objects.filter(user_id=user)
        
        # Serializar los datos utilizando el serializador
        serializer = PaymentMethodSerializer(card, many=True)
        data = serializer.data

        # Formato de salida, puedes adaptarlo según tus necesidades
        response_data = {
            'cards': data
        }

        return Response(response_data)

class CategoriesViewSet(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class CategoriesViewSet(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurants.objects.all()
    serializer_class = RestaurantsSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

            
    @action(detail=True, methods=['get'])
    def print_restaurants_por_category(self, request, pk=None):
        categoria = get_object_or_404(Categories, id=pk)
        restaurantes = Restaurants.objects.filter(categories_id=categoria)
        
        # Serializar los datos utilizando el serializador
        serializer = RestaurantsSerializer(restaurantes, many=True)
        data = serializer.data

        # Formato de salida, puedes adaptarlo según tus necesidades
        response_data = {
            'categoria': categoria.name,
            'restaurantes': data
        }

        return Response(response_data)


class FoodsViewSet(viewsets.ModelViewSet):
    queryset = Foods.objects.all()
    serializer_class = FoodsSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=True, methods=['get'])
    def print_foods_por_restaurants(self, request, pk=None):
        restaurant = get_object_or_404(Restaurants, id=pk)
        foods = Foods.objects.filter(restaurant_id=restaurant)

        # Serializar los datos utilizando el serializador
        serializer = FoodsSerializer(foods, many=True)
        data = serializer.data

        # Formato de salida, puedes adaptarlo según tus necesidades
        response_data = {
            'Restaurant': restaurant.name,
            'foods': data
        }

        return Response(response_data)
    
class OrdersViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class Login(APIView):

    def post(self, request, *args, **kwargs):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            nombre = serializer.validated_data.get("nombre")
            password = serializer.validated_data.get("password")
            role, user_id = get_user_role(nombre, password)
            if role:
                return Response({"role": role, "user_id": user_id}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "No active account found with the given credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
