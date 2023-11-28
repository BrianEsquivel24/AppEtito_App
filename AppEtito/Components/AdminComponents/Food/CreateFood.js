import React, { useState, useEffect } from 'react';
import { View, Text, Button, Input, ScrollView, Image, Select, CheckIcon, Center, Container, Heading } from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet } from 'react-native';

const AgregarFood = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [image, setImage] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Solicitar permisos al cargar el componente
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.error('Se necesitan permisos para acceder a la biblioteca de medios.');
      }
    })();



    fetchRestaurants();
  }, []);


  // Obtener  al cargar el componente
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://192.168.1.94:8000/api/restaurants/');
      setRestaurants(response.data);
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
      formData.append('price', price);
      formData.append('restaurant', restaurantId);

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
        'http://192.168.1.94:8000/api/foods/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Food agregado exitosamente:', response.data);
      navigation.navigate('FoodScreen');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Error de validación:', error.response.data);
      } else {
        console.error('Error al agregar Food:', error);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
     
      
        <Heading style={styles.title}>Comida</Heading>
        <Container>
        <Text style={styles.label}>Nombre:</Text>
        <Input
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Ingrese el nombre"
          style={styles.input}
        />

        <Text style={styles.label}>Descripcion:</Text>
        <Input
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="Ingrese la descripción"
          style={styles.input}
        />

        <Text style={styles.label}>Precio:</Text>
        <Input
          value={price}
          onChangeText={(text) => setPrice(text)}
          placeholder="Ingrese el precio"
          style={styles.input}
        />

        <Text style={styles.label}>Restaurante:</Text>
        <Select
          selectedValue={restaurantId.toString()} // Convierte a cadena
          minWidth="310"
          accessibilityLabel="Selecciona un restaurante"
          placeholder="Selecciona un restaurante"
          style={styles.input}
          onValueChange={(value) => setRestaurantId(parseInt(value, 10))} // Convierte a número
        >
          {restaurants.map((food) => (
            <Select.Item key={food.id} label={`${food.id} - ${food.name}`} value={food.id.toString()} />
          ))}
        </Select>

        </Container>
        <Button onPress={handlePickDocument} full title="Seleccionar Archivo" style={styles.button}>
          <Text style={styles.buttonText}>Seleccionar Archivo</Text>
        </Button >

        {image && <Image source={{ uri: image }} style={styles.image} alt="Foto seleccionada" />}

        <Button onPress={handleAdd} full title="Agregar Administrador" style={styles.button}>
          <Text style={styles.buttonText}>Agregar Comida</Text>
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

export default AgregarFood;
