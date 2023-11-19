import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Container, Text, Box, HStack, VStack, 
  Button, ScrollView, Center, Image } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CategoryList = ({ categories }) => {
  return (
    <Center>
      {categories.map((item) => (
        <Box key={item.id} p={4} borderWidth={1} my={2} borderRadius={8}>
          <Text alignContent="center">{item.name}</Text>
          <Image source={{ uri: item.image }} alt="Product Image" size={200} resizeMode="contain" />
          <Text></Text>
        </Box>
      ))}
    </Center>
  );
};

const RestaurantList = ({ restaurants }) => {
  return (
    <Center>
      {restaurants.map((item) => (
        <Box key={item.id} p={4} borderWidth={1} my={2} borderRadius={8}>
          <Text alignContent="center">{item.name}</Text>
          <Image source={{ uri: item.image }} alt="Product Image" size={200} resizeMode="contain" />
          <Text></Text>
        </Box>
      ))}
    </Center>
  );
};

const Home = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const response = await axios.get('http://192.168.1.94:8000/api/restaurants/', {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
        });
        setRestaurantData(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    getRestaurants();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get('http://192.168.0.9:8000/api/categories/', {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
        });
        setCategoryData(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategories();

  }, []);

  const navigateToAgregarLocation = () => {
    navigation.navigate('AgregarLocation', { userId });
  };

  return (
    <ScrollView>
      <Container alignItems="justify" p={4} flex="1">
        <Box bg="gray.200" p={4} borderRadius={10} mb={4}>
          <HStack space={4} alignItems="center">
            <Ionicons name="location" size={24} color="black" />
            <Button onPress={navigateToAgregarLocation}>
              <Text fontWeight="bold">Agregar Dirección</Text>
            </Button>
          </HStack>
        </Box>
        <VStack space={4} alignItems="center">
          <Text textAlign="justify" fontWeight="bold" fontSize="xl">
            ¡Bienvenido a Nuestra Aplicación de Entrega de Comida!
          </Text>
          <Text>
            Explore nuestro menú y haga su pedido con solo unos clics.
          </Text>

          <Text></Text>

          <Text textAlign="justify" fontWeight="bold" fontSize="xl">
            Algunos de nuestros restaurantes
          </Text>
          <RestaurantList
            restaurants={restaurantData.slice(0, 5)}  // Mostrar solo las primeras 5 restaurants
          />

          <Text textAlign="justify" fontWeight="bold" fontSize="xl">
            Algunas de nuestras categorías de comida
          </Text>
          <CategoryList
            categories={categoryData.slice(0, 3)}  // Mostrar solo las primeras 3 categorías
          />
        </VStack>

        <Box bg="gray.100" p={4} borderTopWidth={1} borderTopColor="gray.300" alignItems="center">
          <Text fontSize="sm" textAlign="center" color="gray.600">
            Al usar esta aplicación, aceptas nuestros{' '}
            <Button variant="link" colorScheme="teal" onPress={() => alert('Ir a Términos y Condiciones')}>
              Términos y Condiciones
            </Button>
          </Text>
        </Box>
      </Container>
    </ScrollView>
  );
};

export default Home;