import React, { useState } from 'react';
import { View, Text, Button, Image, Input } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const AgregarAdmin = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [foto, setFoto] = useState('');

  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Usuario canceló la selección de la foto');
      } else if (response.error) {
        console.log('Error:', response.error);
      } else {
        setFoto(response.uri);
      }
    });
  };

  const handleAdd = async () => {
    try {
      // Realizar una solicitud POST para agregar un nuevo producto
      await axios.post('http://127.0.0.1:8000/api/admin/', {
        nombre,
        foto,
      });

      // Después de agregar, navegar de regreso a la lista de productos
      navigation.navigate('AdminCrud');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <View>
      <Text>Nombre:</Text>
      <Input
        value={nombre}
        onChangeText={(text) => setNombre(text)}
        placeholder="Ingrese el nombre"
      />

      <Text>Foto:</Text>
      <Button onPress={handleChoosePhoto} title="Seleccionar Foto">
        <Text>Seleccionar Foto</Text>
      </Button>

      {foto && <Image source={{ uri: foto }} style={{ width: 200, height: 200 }} />}

      <Button onPress={handleAdd} title="Agregar Producto">
        <Text>Agregar Producto</Text>
      </Button>
    </View>
  );
};

export default AgregarAdmin;
