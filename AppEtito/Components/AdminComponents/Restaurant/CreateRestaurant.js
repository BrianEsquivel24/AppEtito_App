import React, { useState, useEffect } from 'react';
import { View, Text, Button, Input, ScrollView, Image, Select, CheckIcon, Center, Container, Heading } from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { Alert } from 'react-native';

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

      //validacion de vacio
      if (!name || !description || !location || !branches || !categoryId || !image) {
        Alert.alert('Por favor, ingrese todos los campos');
        return;
      }
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

      <Heading style={styles.title}>Restaurante</Heading>
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

        <Text style={styles.label}>Pais:</Text>
        <Input
          value={location}
          onChangeText={(text) => setLocation(text)}
          placeholder="Ingrese el pais"
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
          style={styles.input}
          onValueChange={(text) => setCategoryId(text)}
        >
          {categories.map((category) => (
            <Select.Item key={category.id} label={`${category.id} - ${category.name}`} value={category.id} />
          ))}
        </Select>
      </Container>
      <Button onPress={handlePickDocument} full style={styles.button}>
        <Text style={styles.buttonText}>Seleccionar Archivo</Text>
      </Button>

      {image && <Image source={{ uri: image }} style={styles.image} alt="Foto seleccionada" />}

      <Button onPress={handleAdd} full style={styles.button}>
        <Text style={styles.buttonText}>Agregar Restaurant</Text>
      </Button>

    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '90%',

  },
  title: {

    color: '#344340',
    fontWeight: 'bold',
    fontSize: 40,
    lineHeight: 120,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {

    marginBottom: 5,
    borderColor: '#ccc', // Color del borde
    borderWidth: 1,

    paddingHorizontal: 8, // Ajusta el espacio horizontal dentro del input
    paddingVertical: 6,   // Ajusta el espacio vertical dentro del input
    backgroundColor: '#fff', // Color de fondo del input

  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    padding: 10,
    marginTop: 25,
    backgroundColor: '#FF8300',


  },
  image: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  }
});


export default AgregarRestaurant;
