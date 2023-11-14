import React, { useState, useEffect } from 'react';
import { View, Text, Button, Input, ScrollView, Image } from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const UpdateCategory = ({ route, navigation }) => {
  const { category } = route.params;
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [image, setImage] = useState(category.image);

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
        setImage(result.uri);
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);

      if (image) {
        const uriParts = image.split('.');
        const fileType = uriParts[uriParts.length - 1];

        // Generar un nombre único para el archivo basado en el sello de tiempo
        const fileName = `photo_${Date.now()}.${fileType}`;

        formData.append('image', {
          uri: image,
          name: fileName,
          type: `image/${fileType}`,
        });
      }

      const response = await axios.put(
        `http://192.168.1.73:8000/api/categories/${category.id}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Administrador actualizado exitosamente:', response.data);
      navigation.navigate('CategoryScreen');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Error de validación:', error.response.data);
      } else {
        console.error('Error al actualizar el administrador:', error);
      }
    }
  };

  return (
    <ScrollView>
      <Text>Nombre:</Text>
      <Input
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Ingrese el nombre"
      />

      <Text>Descripción:</Text>
      <Input
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Ingrese la Descripcion"
      />

      <Button onPress={handlePickDocument} full title="Seleccionar Archivo">
        <Text>Seleccionar Archivo</Text>
      </Button>

      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} alt="Foto seleccionada"/>}

      <Button onPress={handleUpdate} full title="Actualizar Administrador">
        <Text>Actualizar Categoria</Text>
      </Button>
    </ScrollView>
  );
};

export default UpdateCategory;