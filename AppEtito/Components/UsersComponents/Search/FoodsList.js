import React, { useState, useEffect } from "react";
import { Container, VStack, Box, Heading, Text, Spinner, ScrollView, Image, Button, Modal, HStack, Pressable } from "native-base";
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
  const [isModalVisible, setModalVisible] = useState(false);

  const restaurantId = route.params.restaurantId;

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const apiUrl = `http://192.168.1.73:8000/api/foods/${restaurantId}/print_foods_por_restaurants/`;
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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddToCart = (food) => {
    addToCartContext(food);
    toggleModal();
  };

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
                      source={{ uri: "http://192.168.1.73:8000" + food.image }}
                      alt="Product Image"
                      size={200}
                      resizeMode="contain"
                    />
                    <VStack p={4}>
                      <Heading size="md">{food.name}</Heading>
                      <Text>{food.description}</Text>
                      <Text>Precio: {food.price}</Text>
                    </VStack>
                    <Button onPress={() => handleAddToCart(food)} >Agregar al carrito</Button>
                  </Box>
                ))
              ) : (
                <Text>No hay restaurantes disponibles.</Text>
              )}
            </VStack>
          )}
        </VStack>

        {/* Modal */}
        <Modal isOpen={isModalVisible} onClose={toggleModal}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Producto agregado con éxito</Modal.Header>
            <Modal.Body>
              <Text>Tu producto ha sido agregado al carrito con éxito.</Text>
            </Modal.Body>
            <Modal.Footer>
              <HStack space={2}>
                <Pressable onPress={toggleModal}>
                  <Text>Aceptar</Text>
                </Pressable>
              </HStack>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Container>
    </ScrollView>
  );
};

export default FoodsList;
