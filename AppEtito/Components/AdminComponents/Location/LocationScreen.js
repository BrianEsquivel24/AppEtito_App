import React, { useState, useEffect } from 'react';
import { Container, Content, Text, Button, Box, Image, Center, ScrollView, Heading } from 'native-base';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LocationScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await axios.get('http://192.168.1.73:8000/api/locations/', {
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

    getLocations();
  }, []);

  const agregarLocation = () => {
    navigation.navigate('AgregarLocation');
  };

  const editarLocation = (item) => {
    navigation.navigate('UpdateLocation', { location: item });
  };

  const handleDeleteLocation = async (id) => {
    try {
      await axios.delete(`http://192.168.1.73:8000/api/locations/${id}/`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting location:', error.message);
    }
  };

  return (
    <ScrollView>
      <Container style={{ paddingTop: 40 }} alignItems="center">
        <Heading>LOCATION SCREEN</Heading>
        <Center>
          <Button onPress={agregarLocation} full>
            <Text>Agregar Location</Text>
          </Button>

          {data.map((item) => (
            <Box key={item.id} p={4} borderWidth={1} my={2} borderRadius={8}>
              <Text alignContent="center">{item.address}</Text>
              <Text alignContent="center">{item.description}</Text>
              <Button onPress={() => editarLocation(item)} my={2}>
                <Text>Editar</Text>
              </Button>
              <Button onPress={() => handleDeleteLocation(item.id)} my={2}>
                <Text>Eliminar</Text>
              </Button>
            </Box>
          ))}
        </Center>
      </Container>
    </ScrollView>
  );
};

export default LocationScreen;
