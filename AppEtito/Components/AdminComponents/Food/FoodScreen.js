import React, { useState, useEffect } from 'react';
import { Container, Content, Text, Button, Box, Image, Center, ScrollView, Heading } from 'native-base';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const FoodScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await axios.get('http://192.168.1.73:8000/api/foods/', {
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

    getFoods();
  }, []);

  const agregarFood = () => {
    navigation.navigate('AgregarFood');
  };

  const editarFood = (item) => {
    navigation.navigate('UpdateFood', { foods: item });
  };

  const handleDeleteFood = async (id) => {
    try {
      await axios.delete(`http://192.168.1.73:8000/api/foods/${id}/`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting foods:', error.message);
    }
  };

  return (
    <ScrollView>
      <Container style={{ paddingTop: 40 }} alignItems="center">
        <Heading>FOOD</Heading>
        <Center>
          <Button onPress={agregarFood} full>
            <Text>Agregar Comida</Text>
          </Button>

          {data.map((item) => (
            <Box key={item.id} p={4} borderWidth={1} my={2} borderRadius={8}>
              <Text alignContent="center">{item.name}</Text>
              <Image source={{ uri: item.image }} alt="Product Image" size={200} resizeMode="contain" />
              <Button onPress={() => editarFood(item)} my={2}>
                <Text>Editar</Text>
              </Button>
              <Button onPress={() => handleDeleteFood(item.id)} my={2}>
                <Text>Eliminar</Text>
              </Button>
            </Box>
          ))}
        </Center>
      </Container>
    </ScrollView>
  );
};

export default FoodScreen;
