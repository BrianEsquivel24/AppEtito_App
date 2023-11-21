import React, { useState, useEffect } from "react";
import { Container, VStack, Box, Heading, Text, Spinner, ScrollView, Image, Button } from "native-base";
import axios from "axios";


const RestaurantList = ({ route, navigation }) => {
  const [restaurants, setRestaurants] = useState({
    categoria: '',
    restaurantes: [],
  });

  const [loading, setLoading] = useState(true);
  const categoryId = route.params.categoryId;

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const apiUrl = `http://192.168.1.73:8000/api/restaurants/${categoryId}/print_restaurants_por_category/`;
        console.log('API URL:', apiUrl);

        const response = await axios.get(apiUrl);
        console.log('Response Data:', response.data);
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de restaurantes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [categoryId]);

  const verDetalles = (restaurantId) => {
    // Navegar a la pantalla de detalles del restaurante con el ID del restaurante
    navigation.navigate('FoodsList', { restaurantId });
  };

  return (
    <ScrollView>
      
        <VStack space={4} alignItems="center" mt={4}>
          <Heading fontSize="xl" fontWeight="bold">Lista de Restaurantes</Heading>

          {loading ? (
            <Spinner />
          ) : (
            <VStack space={4} alignItems="center" mt={2}>
              {Array.isArray(restaurants.restaurantes) && restaurants.restaurantes.length > 0 ? (
                restaurants.restaurantes.map((restaurant) => (
                  <Box
                    key={restaurant.id}
                    bg="white"
                    shadow={2}
                    rounded="lg"
                    width="90%"
                    overflow="hidden"
                  >
                    <Image
                    source={{ uri: "http://192.168.1.73:8000"+restaurant.image }}
                    alt="Product Image"
                    size={200}
                    resizeMode="contain"
                  />
                    <VStack p={4}>
                      <Heading size="md">{restaurant.name}</Heading>
                      <Text>{restaurant.description}</Text>
                    </VStack>
                    <Button onPress={() => verDetalles(restaurant.id)}>Ver Detalles</Button>
                  </Box>
                ))
              ) : (
                <Text>No hay restaurantes disponibles.</Text>
              )}
            </VStack>
          )}
        </VStack>
   
    </ScrollView>
  );
};

export default RestaurantList;
