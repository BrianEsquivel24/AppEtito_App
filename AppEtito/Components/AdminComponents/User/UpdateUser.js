import React, { useState, useEffect } from 'react';
import { View, Text, Button, Input, ScrollView, Image, Container, Heading } from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const UpdateUser = ({ route, navigation }) => {
  const { user } = route.params;
  const [nombre, setNombre] = useState(user.nombre);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [phone_number, setPhoneNumber] = useState(user.phone_number);
  const [photo, setPhoto] = useState(user.photo);

  useEffect(() => {
    // Solicitar permisos al cargar el componente
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.error('Se necesitan permisos para acceder a la biblioteca de medios.');
      }
    })();
  }, []);

  const handlePickDocument = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setPhoto(result.uri);
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phone_number', phone_number);

      if (photo) {
        const uriParts = photo.split('.');
        const fileType = uriParts[uriParts.length - 1];

        // Generar un nombre único para el archivo basado en el sello de tiempo
        const fileName = `photo_${Date.now()}.${fileType}`;

        formData.append('photo', {
          uri: photo,
          name: fileName,
          type: `image/${fileType}`,
        });
      }

      const response = await axios.put(
        `http://192.168.1.73:8000/api/user/${user.id}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('User actualizado exitosamente:', response.data);
      navigation.navigate('UserScreen');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Error de validación:', error.response.data);
      } else {
        console.error('Error al actualizar el User:', error);
      }
    }
  };

  return (
    <ScrollView>
      <Container style={{ paddingTop: 40 }} alignItems="center">
        <Heading>UPDATE USER</Heading>
        <Text>Nombre:</Text>
        <Input
          value={nombre}
          onChangeText={(text) => setNombre(text)}
          placeholder="Ingrese el nombre"
        />

        <Text>Email:</Text>
        <Input
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Ingrese el email"
        />

        <Text>Contraseña:</Text>
        <Input
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Ingrese la contraseña"
          secureTextEntry
        />

        <Text>Número de teléfono:</Text>
        <Input
          value={phone_number}
          onChangeText={(text) => setPhoneNumber(text)}
          placeholder="Ingrese el número de teléfono"
        />

        <Button onPress={handlePickDocument} full title="Seleccionar Archivo">
          <Text>Seleccionar Archivo</Text>
        </Button>

        {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200, marginTop: 20 }} alt="Foto seleccionada" />}

        <Button onPress={handleUpdate} full title="Actualizar Administrador">
          <Text>Actualizar User</Text>
        </Button>
      </Container>
    </ScrollView>
  );
};

export default UpdateUser;
