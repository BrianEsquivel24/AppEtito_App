import React, { useState, useEffect } from 'react';
import { Container, Content, Text, Button, Box, Image, Center, ScrollView, Heading } from 'native-base';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const UserScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('http://192.168.1.94:8000/api/user/', {
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

    getUsers();
  }, []);

  const agregarUser = () => {
    navigation.navigate('AgregarUser');
  };

  const editarUser = (item) => {
    navigation.navigate('UpdateUser', { user: item });
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://192.168.1.94:8000/api/user/${id}/`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  return (
    <ScrollView>
      <Container style={{ paddingTop: 40 }} alignItems="center">
        <Heading>USER</Heading>
        <Center>
          <Button onPress={agregarUser} full>
            <Text>Agregar User</Text>
          </Button>

          {data.map((item) => (
            <Box key={item.id} p={4} borderWidth={1} my={2} borderRadius={8}>
              <Text alignContent="center">{item.nombre}</Text>
              <Image source={{ uri: item.photo }} alt="Product Image" size={200} resizeMode="contain" />
              <Button onPress={() => editarUser(item)} my={2}>
                <Text>Editar</Text>
              </Button>
              <Button onPress={() => handleDeleteUser(item.id)} my={2}>
                <Text>Eliminar</Text>
              </Button>
            </Box>
          ))}
        </Center>
      </Container>
    </ScrollView>
  );
};

export default UserScreen;
