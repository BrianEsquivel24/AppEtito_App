// Profile.js
import React, { useState, useEffect } from 'react';
import { ScrollView, Container, Heading, Text, Button, Image, Card } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../CartContext'; 

const Profile = ({ navigation }) => {
  const { clearCart } = useCart(); 

  const [user, setUser] = useState({
    id: '',
    nombre: '',
    email: '',
    password: '',
    phone_number: '',
    photo: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem('id');
        const response = await axios.get(`http://192.168.1.73:8000/api/user/${userId}/`);
        setUser(response.data);
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    // clean cart
    clearCart(); 

    // go to login screen
    navigation.navigate('Login'); 
  };

  const goToLocation = () =>{
    navigation.navigate("AgregarLocationUser")
  }

  const goToPayment = () =>{
    navigation.navigate("AgregarPaymentMethodUser")
  }

  return (
    <ScrollView>
      <Container style={{ paddingTop: 40 }} alignItems="center">
        <Heading>PROFILE</Heading>
        <Card>
          {user.id && ( // Verificación para asegurarse de que user.id esté definido
            <>
              <Image source={{ uri: user.photo }} style={{ width: 200, height: 200 }} alt="Foto de perfil" />
              <Text>Nombre: {user.nombre}</Text>
              <Text>Email: {user.email}</Text>
              <Text>Número de teléfono: {user.phone_number}</Text>

              <Button onPress={goToLocation} mt={4} colorScheme="success">
                Agregar Location
              </Button>
              <Button onPress={goToPayment} mt={4} colorScheme="success">
                Agregar Card
              </Button>
              <Button onPress={handleLogout} mt={4} colorScheme="danger">
                Cerrar Sesión
              </Button>
            </>
          )}
        </Card>
      </Container>
    </ScrollView>
  );
};

export default Profile;
