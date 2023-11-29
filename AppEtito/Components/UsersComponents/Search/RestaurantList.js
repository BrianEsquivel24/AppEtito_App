import React, { useState, useEffect } from "react";
import { Container, VStack, Box, Heading, Text, Spinner, ScrollView, Image, Button } from "native-base";
import axios from "axios";
import { View, StyleSheet, TextInput, SafeAreaView } from 'react-native';



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
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Heading style={styles.title}>Restaurantes</Heading>

          {loading ? (
            <Spinner />
          ) : (
            <VStack space={4} alignItems="center" mt={2}>
              {Array.isArray(restaurants.restaurantes) && restaurants.restaurantes.length > 0 ? (
                restaurants.restaurantes.map((restaurant) => (
                  <Box
                    style={styles.cardContainer}
                    key={restaurant.id}
                    bg="white"
                    shadow={2}
                    rounded="lg"
                    width="90%"
                    overflow="hidden"
                  >
                    <Image
                      style={styles.cardImage}
                      source={{ uri: "http://192.168.1.73:8000" + restaurant.image }}
                      alt="Product Image"
                      resizeMode="contain"
                    />
                    <View>
                      <Text style={styles.cardTitle}>{restaurant.name}</Text>
                      <Text style={styles.text}>{restaurant.description}</Text>
                    </View>
                    <Button style={styles.cardButton} onPress={() => verDetalles(restaurant.id)}>Detalles</Button>
                  </Box>
                ))
              ) : (
                <Text>No hay restaurantes disponibles.</Text>
              )}
            </VStack>
          )}
        </View>
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


export default RestaurantList;
