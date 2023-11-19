import React, { useState, useEffect } from 'react';
import { ScrollView, Container, Heading, Text, Button, Image, Card } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
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
        // Obtener el ID del usuario almacenado en AsyncStorage
        const userId = await AsyncStorage.getItem('id');

        // Hacer la solicitud GET al backend para obtener la información del usuario
        const response = await axios.get(`http://192.168.0.9:8000/api/user/${userId}/`);
        
        // Actualizar el estado del usuario con la respuesta del servidor
        setUser(response.data);
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <ScrollView>
      <Container style={{ paddingTop: 40 }} alignItems="center">
        <Heading>PROFILE</Heading>
        <Card>
          <Image source={{ uri: user.photo }} style={{ width: 200, height: 200 }} alt="Foto de perfil" />
          <Text>Nombre: {user.nombre}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Número de teléfono: {user.phone_number}</Text>
        </Card>
      </Container>
    </ScrollView>
  );
};

export default Profile;
