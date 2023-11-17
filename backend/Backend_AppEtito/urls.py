from django.urls import path, include
from rest_framework.routers import DefaultRouter
<<<<<<< HEAD
=======


>>>>>>> 9d218a4f2f5383fbb8f3687b7d3fece1348e17b3
from .views import AdminViewSet, UserViewSet, Login, LocationsViewSet, PaymentMethodViewSet, CategoriesViewSet, RestaurantViewSet, FoodsViewSet, OrdersViewSet

router = DefaultRouter()
router.register(r'admin', AdminViewSet)
router.register(r'user', UserViewSet)
router.register(r'locations', LocationsViewSet)
router.register(r'payment', PaymentMethodViewSet)
router.register(r'categories', CategoriesViewSet)
router.register(r'restaurants', RestaurantViewSet, basename='categories_pk')
router.register(r'foods', FoodsViewSet)
router.register(r'orders', OrdersViewSet)

urlpatterns = [
    path('', include(router.urls)),
<<<<<<< HEAD
    path('login/', Login.as_view(), name='login')
=======
    path('login/', Login.as_view(), name='login'),
>>>>>>> 9d218a4f2f5383fbb8f3687b7d3fece1348e17b3
]
