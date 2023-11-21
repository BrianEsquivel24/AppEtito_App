import React, { useState, useEffect } from "react";
import { Container, VStack, Box, Heading, Text, Spinner, ScrollView, Image, Button } from "native-base";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCart } from '../CartContext';

const FoodsList = ({ route, navigation }) => {
  const { addToCart: addToCartContext } = useCart(); 

  const [foodis, setFoods] = useState({
    restaurant: '',
    foods: [],
  });

  const [loading, setLoading] = useState(true);

  const restaurantId = route.params.restaurantId;

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const apiUrl = `http://192.168.1.94:8000/api/foods/${restaurantId}/print_foods_por_restaurants/`;
        console.log('API URL:', apiUrl);

        const response = await axios.get(apiUrl);
        console.log('Response Data:', response.data);
        setFoods(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [restaurantId]);

  return (
    <ScrollView>
      <Container alignItems="center">
        <VStack space={4} alignItems="center" mt={4}>
          <Heading fontSize="xl" fontWeight="bold">Lista de Comidas</Heading>

          {loading ? (
            <Spinner />
          ) : (
            <VStack space={4} alignItems="center" mt={2}>
              {Array.isArray(foodis.foods) && foodis.foods.length > 0 ? (
                foodis.foods.map((food) => (
                  <Box
                    key={food.id}
                    bg="white"
                    shadow={2}
                    rounded="lg"
                    width="90%"
                    overflow="hidden"
                  >
                    <Image
                      source={{ uri: "http://192.168.1.94:8000" + food.image }}
                      alt="Product Image"
                      size={200}
                      resizeMode="contain"
                    />
                    <VStack p={4}>
                      <Heading size="md">{food.name}</Heading>
                      <Text>{food.description}</Text>
                      <Text>Precio: {food.price}</Text>
                    </VStack>
                    <Button onPress={() => addToCartContext(food)} >Agregar al carrito</Button>
                  </Box>
                ))
              ) : (
                <Text>No hay restaurantes disponibles.</Text>
              )}
            </VStack>
          )}
        </VStack>
      </Container>
    </ScrollView>
  );
};

export default FoodsList;