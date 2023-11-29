import React, { useState, useEffect } from "react";
import { Container, VStack, Box, Heading, Text, Spinner, ScrollView, Image, Button, Modal, HStack, Pressable } from "native-base";
import axios from "axios";
import { useCart } from '../CartContext';
import { View, StyleSheet, TextInput, SafeAreaView } from 'react-native';

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
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Heading style={styles.title}>Alimentos</Heading>
          {loading ? (
            <Spinner />
          ) : (

            <VStack space={4} alignItems="center" mt={2}>
              {Array.isArray(foodis.foods) && foodis.foods.length > 0 ? (
                foodis.foods.map((food) => (
                  <Box
                    style={styles.cardContainer}
                    key={food.id}
                    bg="white"
                    shadow={2}
                    rounded="lg"
                    width="90%"
                    overflow="hidden"
                  >

                    <Image
                      style={styles.cardImage}
                      source={{ uri: "http://192.168.1.73:8000" + food.image }}
                      alt="Product Image"                      
                      resizeMode="contain"
                    />
                    <VStack p={4}>
                      <Text style={styles.cardTitle}>{food.name}</Text>
                      <Text style={styles.text}>{food.description}</Text>
                      <Text style={styles.text}>Precio: {food.price}</Text>
                    </VStack>
                    <Button style={styles.cardButton} onPress={() => handleAddToCart(food)} >Agregar al carrito</Button>
                  </Box>
                ))
              ) : (
                <Text>No hay restaurantes disponibles.</Text>
              )}
            </VStack>
          )}
        </View>

        {/* Modal */}
        <Modal isOpen={isModalVisible} onClose={toggleModal}>
          <Modal.Content style={styles.cardContainer}>
            <Modal.CloseButton />
            <Modal.Header style={styles.title}>Producto agregado con éxito</Modal.Header>
            <Modal.Body>
              <Text >Tu producto ha sido agregado al carrito con éxito.</Text>
            </Modal.Body>
            <Modal.Footer>
              <HStack space={2}>
                <Pressable style={styles.cardButton} onPress={toggleModal}>
                  <Text style={styles.buttonText}>Aceptar</Text>
                </Pressable>
              </HStack>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#f1f1f1',
    flex: 1,
  },
  container: {

    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',

  },
  title: {
    paddingTop: 50,
    color: '#344340',
    fontWeight: 'bold',
    fontSize: 50,
    lineHeight: 80,
  },

  text: {
    paddingBottom: 5,
    alignContent: 'space-between',
    fontSize: 15,
    textAlign: 'center'
  },

  textTitles: {
    color: '#FF8300',
    paddingTop: 20,
    textAlign: 'center',
    fontSize: 20
  },

  button: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    backgroundColor: '#FF8300',
    fontSize: 20,
    margin: 20,

  },
  cardContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    width: '90%', // Ajusta el ancho según sea necesario
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center', // Alinea el texto al centro
  },
  cardImage: {
    width: 300,
    height: 200,
    marginBottom: 8,
    borderRadius: 8, // Ajusta según sea necesario
  },
  cardButton: {
    backgroundColor: '#FF8300',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  }
});

export default FoodsList;
