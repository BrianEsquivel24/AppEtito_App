import React, { useState, useEffect } from 'react';
import { Container, Header, Text, Button, Box, Image, Center, ScrollView, Heading } from 'native-base';
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

    getAdmins();
  }, []);

  const agregarAdmin = () => {
    navigation.navigate('AgregarAdmin');
  };

  const editarAdmin = (item) => {
    navigation.navigate('UpdateAdmin', { admin: item });
  };

  const handleDeleteAdmin = async (id) => {
    try {
      await axios.delete(`http://192.168.1.73:8000/api/admin/${id}/`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting admin:', error.message);
    }
  };

  return (
    <ScrollView>
      <Container style={{ paddingTop: 40 }} alignItems="center">
        <Center>
          <Heading>ADMIN</Heading>
          <Button onPress={agregarAdmin} full>
            <Text>Agregar Admin</Text>
          </Button>

          {data.map((item) => (
            <Box key={item.id} p={4} borderWidth={1} my={2} borderRadius={8}>
              <Text alignContent="center">{item.nombre}</Text>
              <Image source={{ uri: item.photo }} alt="Product Image" size={200} resizeMode="contain" />
              <Button onPress={() => editarAdmin(item)} my={2}>
                <Text>Editar</Text>
              </Button>
              <Button onPress={() => handleDeleteAdmin(item.id)} my={2}>
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
