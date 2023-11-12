import React, { useState, useEffect } from 'react';
import { Container, Content, Text, Button, Box, Image, Center, ScrollView } from 'native-base';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AdminScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const response = await axios.get('http://192.168.1.73:8000/api/admin/', {
          headers: {
            // Add any headers you need here
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json', // Example header, adjust as needed
            // 'Authorization': 'Bearer YourToken', // Add an authorization header if needed
          },
        });
        setData(response.data);
      } catch (error) {
        if (error.isAxiosError && !error.response) {
          // Handle network errors
          console.error('Network Error:', error.message);
        } else {
          // Handle other errors
          console.error('Error:', error);
        }
      }
    };

    getAdmins();
  }, []);

  const agregarAdmin = () => {
    navigation.navigate('AgregarAdmin');
  };

  const editarAdmin = (item) => {
    navigation.navigate('EditarAdmin', { admin: item });
  };

  const borrarAdmin = async (id) => {
    try {
      await axios.delete(`https://tu-api.com/tu-ruta/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <ScrollView>
      <Container>
        <Center>
          <Button onPress={agregarAdmin} full>
            <Text>Agregar Producto</Text>
          </Button>

          {data.map((item) => (
            <Box key={item.id} p={4} borderWidth={1} my={2} borderRadius={8}>
              <Text alignContent="center">{item.nombre}</Text>
              <Image source={{ uri: item.photo }} alt="Product Image" size={200} resizeMode="contain" />
              <Button onPress={() => editarAdmin(item)} my={2}>
                <Text>Editar</Text>
              </Button>
              <Button onPress={() => borrarAdmin(item.id)} my={2}>
                <Text>Eliminar</Text>
              </Button>
            </Box>
          ))}
        </Center>
      </Container>
    </ScrollView>
  );
};

export default AdminScreen;
