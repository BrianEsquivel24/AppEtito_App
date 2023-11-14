import React, { useState, useEffect } from 'react';
import { Container, Content, Text, Button, Box, Image, Center, ScrollView } from 'native-base';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const RestaurantScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const response = await axios.get('http://192.168.1.73:8000/api/restaurants/', {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json', 

          },
        });
        setData(response.data);
      } catch (error) {
        if (error.isAxiosError && !error.response) {
          console.error('Network Error:', error.message);
        } else {

          console.error('Error:', error);
        }
      }
    };

    getRestaurants();
  }, []);

  const agregarRestaurant = () => {
    navigation.navigate('AgregarRestaurant');
  };

  const editarRestaurant = (item) => {
    navigation.navigate('UpdateRestaurant', { restaurant: item });
  };

  const handleDeleteRestaurant = async (id) => {
    try {
      await axios.delete(`http://192.168.1.73:8000/api/restaurants/${id}/`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting restaurants:', error.message);
    }
  };

  return (
    <ScrollView>
      <Container>
        <Center>
          <Button onPress={agregarRestaurant} full>
            <Text>Agregar Restaurant</Text>
          </Button>

          {data.map((item) => (
            <Box key={item.id} p={4} borderWidth={1} my={2} borderRadius={8}>
              <Text alignContent="center">{item.name}</Text>
              <Image source={{ uri: item.image }} alt="Product Image" size={200} resizeMode="contain" />
              <Button onPress={() => editarRestaurant(item)} my={2}>
                <Text>Editar</Text>
              </Button>
              <Button onPress={() => handleDeleteRestaurant(item.id)} my={2}>
                <Text>Eliminar</Text>
              </Button>
            </Box>
          ))}
        </Center>
      </Container>
    </ScrollView>
  );
};

export default RestaurantScreen;
