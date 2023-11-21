import React, { useState, useEffect } from 'react';
import { View, Text, Button, Input, ScrollView, Image, Select, CheckIcon, Center, Container, Heading } from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, TextInput, SafeAreaView } from 'react-native';

const AgregarRestaurant = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [branches, setBranches] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Solicitar permisos al cargar el componente
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.error('Se necesitan permisos para acceder a la biblioteca de medios.');
      }
    })();



    fetchCategories();
  }, []);


  // Obtener categorías al cargar el componente
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://192.168.1.94:8000/api/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };


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

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('Location', location);
      formData.append('branches', branches);
      formData.append('categories', categoryId);

      if (image) {
        const uriParts = (image || '').split('.');
        const fileType = uriParts[uriParts.length - 1];
        const fileName = `photo_${Date.now()}.${fileType}`;

        formData.append('image', {
          uri: image,
          name: fileName,
          type: `image/${fileType}`,
        });
      }

      const response = await axios.post(
        'http://192.168.1.94:8000/api/restaurants/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Restaurante agregado exitosamente:', response.data);
      navigation.navigate('RestaurantScreen');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Error de validación:', error.response.data);
      } else {
        console.error('Error al agregar el restaurante:', error);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
        <Heading style={styles.title}>CREATE RESTAURANT</Heading>
        <Container  >
        <Text style={styles.label}>Nombre:</Text>
        <Input
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Ingrese el nombre"
          style={styles.input}
        />

        <Text style={styles.label}>Description:</Text>
        <Input
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="Ingrese la description"
          style={styles.input}
        />

        <Text style={styles.label}>Location:</Text>
        <Input
          value={location}
          onChangeText={(text) => setLocation(text)}
          placeholder="Ingrese la location"
          style={styles.input}
        />

        <Text style={styles.label}>Sucursales:</Text>
        <Input
          value={branches}
          onChangeText={(text) => setBranches(text)}
          placeholder="Ingrese la cantidad de sucursales"
          style={styles.input}
        />

        <Text style={styles.label}>Categoría:</Text>
        <Select
          selectedValue={categoryId}
          minWidth="200"
          accessibilityLabel="Selecciona una categoría"
          placeholder="Selecciona una categoría"
          onValueChange={(text) => setCategoryId(text)}
        >
          {categories.map((category) => (
            <Select.Item key={category.id} label={`${category.id} - ${category.name}`} value={category.id} />
          ))}
        </Select>
        </Container>
        <Button onPress={handlePickDocument} full title="Seleccionar Archivo">
          <Text>Seleccionar Archivo</Text>
        </Button>

        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} alt="Foto seleccionada" />}

        <Button onPress={handleAdd} full title="Agregar Administrador">
          <Text>Agregar Restaurant</Text>
        </Button>
     
    </ScrollView>
  );
};

export default AgregarRestaurant;
