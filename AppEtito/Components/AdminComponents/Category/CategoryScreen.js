import React, { useState, useEffect } from 'react';
import { Container, Heading, Text, Button, Box, Image, Center, ScrollView } from 'native-base';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CategoryScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axios.get('http://192.168.0.9:8000/api/categories/', {
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

    getCategory();
  }, []);

  const agregarCategory = () => {
    navigation.navigate('AgregarCategory');
  };

  const editarCategory = (item) => {
    navigation.navigate('UpdateCategory', { category: item });
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://192.168.0.9:8000/api/categories/${id}/`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting admin:', error.message);
    }
  };

  return (
    <ScrollView>
      <Container style={{ paddingTop: 40 }} alignItems="center">
        <Center>
        <Heading>CATEGORY</Heading>
          <Button onPress={agregarCategory} full>
            <Text>Agregar Category</Text>
          </Button>

          {data.map((item) => (
            <Box key={item.id} p={4} borderWidth={1} my={2} borderRadius={8}>
              <Text alignContent="center">{item.name}</Text>
              <Image source={{ uri: item.image }} alt="Product Image" size={200} resizeMode="contain" />
              <Button onPress={() => editarCategory(item)} my={2}>
                <Text>Editar</Text>
              </Button>
              <Button onPress={() => handleDeleteCategory(item.id)} my={2}>
                <Text>Eliminar</Text>
              </Button>
            </Box>
          ))}
        </Center>
      </Container>
    </ScrollView>
  );
};

export default CategoryScreen;

    