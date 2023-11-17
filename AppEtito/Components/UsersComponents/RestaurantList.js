import React, { useState, useEffect } from "react";
import { Container, VStack, Box, Heading, Text, Spinner, ScrollView, Image, Button } from "native-base";
import axios from "axios";

const RestaurantList = ({ route }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const categoryId = route.params.categoryId;

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const apiUrl = `http://192.168.0.9:8000/api/restaurants/?category=${categoryId}`;
        console.log('API URL:', apiUrl);

        const response = await axios.get(apiUrl);
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de restaurantes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [categoryId]);

  return (
    <ScrollView>
      <Container alignItems="center">
        <VStack space={4} alignItems="center" mt={4}>
          <Heading fontSize="xl" fontWeight="bold">Lista de Restaurantes</Heading>

          {loading ? (
            <Spinner />
          ) : (
            <VStack space={4} alignItems="center" mt={2}>
              {restaurants.map((restaurant) => (
                <Box
                  key={restaurant.id}
                  bg="white"
                  shadow={2}
                  rounded="lg"
                  width="90%"
                  overflow="hidden"
                >
                  <Image
                    source={{ uri: restaurant.image }}
                    alt="Restaurant Image"
                    size={200}
                    resizeMode="cover"
                  />
                  <VStack p={4}>
                    <Heading size="md">{restaurant.name}</Heading>
                    <Text>{restaurant.description}</Text>
                  </VStack>
                  <Button>Ver Detalles</Button>
                </Box>
              ))}
            </VStack>
          )}
        </VStack>
      </Container>
    </ScrollView>
  );
};

export default RestaurantList;
