import React, { useState, useEffect } from 'react';
import { View, Text, Button, Input, ScrollView, Image, Container, Heading } from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { Alert } from 'react-native';

const AgregarUser = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [photo, setPhoto] = useState(null);

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

  const handleAdd = async () => {
    try {

      if (!nombre || !email || !password || !phone_number || !photo) {
        Alert.alert('Por favor, ingrese todos los campos');
        return;
      }
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phone_number', phone_number);

      if (photo) {
        const uriParts = (photo || '').split('.');  // Verifica si photo está definido
        const fileType = uriParts[uriParts.length - 1];

        // Generar un nombre único para el archivo basado en el sello de tiempo
        const fileName = `photo_${Date.now()}.${fileType}`;

        formData.append('photo', {
          uri: photo,
          name: fileName,
          type: `image/${fileType}`,
        });
      }

      const response = await axios.post(
        'http://192.168.1.94:8000/api/user/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('User agregado exitosamente:', response.data);
      navigation.navigate('UserScreen');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Error de validación:', error.response.data);
      } else {
        console.error('Error al agregar el User:', error);
      }
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      
        <Heading style={styles.title}>Usuario</Heading>
        <Container>
        <Text style={styles.label}>Nombre:</Text>
        <Input
          value={nombre}
          onChangeText={(text) => setNombre(text)}
          placeholder="Ingrese el nombre"
          style={styles.input}
        />

        <Text style={styles.label}>Email:</Text>
        <Input
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Ingrese el email"
          style={styles.input}
        />

        <Text style={styles.label}>Contraseña:</Text>
        <Input
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Ingrese la contraseña"
          style={styles.input}
          secureTextEntry
        />

        <Text style={styles.label}>Número de teléfono:</Text>
        <Input
          value={phone_number}
          onChangeText={(text) => setPhoneNumber(text)}
          placeholder="Ingrese el número de teléfono"
          style={styles.input}
        />
        </Container>
        <Button onPress={handlePickDocument} full style={styles.button}>
          <Text style={styles.buttonText}>Seleccionar Archivo</Text>
        </Button>

        {photo && <Image source={{ uri: photo }} style={styles.image} alt="Foto seleccionada" />}

        <Button onPress={handleAdd} full style={styles.button}>
          <Text style={styles.buttonText}>Agregar Usuario</Text>
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


export default AgregarUser;
