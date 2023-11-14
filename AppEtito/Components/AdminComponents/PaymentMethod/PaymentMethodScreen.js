import React, { useState, useEffect } from 'react';
import { Container, Content, Text, Button, Box, Image, Center, ScrollView } from 'native-base';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const PaymentMethodScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getPayment = async () => {
      try {
        const response = await axios.get('http://192.168.1.73:8000/api/payment/', {
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

    getPayment();
  }, []);

  const agregarPaymentMethod = () => {
    navigation.navigate('AgregarPaymentMethod');
  };

  const editarPaymentMethod = (item) => {
    navigation.navigate('UpdatePaymentMethod', { paymentMethod: item });
  };

  const handleDeletePaymentMethod = async (id) => {
    try {
      await axios.delete(`http://192.168.1.73:8000/api/payment/${id}/`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting card:', error.message);
    }
  };

  return (
    <ScrollView>
      <Container>
        <Center>
          <Button onPress={agregarPaymentMethod} full>
            <Text>Agregar Card</Text>
          </Button>

          {data.map((item) => (
            <Box key={item.id} p={4} borderWidth={1} my={2} borderRadius={8}>
              <Text alignContent="center">{item.cardNumber}</Text>
              <Button onPress={() => editarPaymentMethod(item)} my={2}>
                <Text>Editar</Text>
              </Button>
              <Button onPress={() => handleDeletePaymentMethod(item.id)} my={2}>
                <Text>Eliminar</Text>
              </Button>
            </Box>
          ))}
        </Center>
      </Container>
    </ScrollView>
  );
};

export default PaymentMethodScreen;
