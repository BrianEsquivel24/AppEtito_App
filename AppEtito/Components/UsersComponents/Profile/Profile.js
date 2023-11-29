// Profile.js
import React, { useState, useEffect } from 'react';
import { ScrollView, Container, Heading, Text, Button, Image, Card } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../CartContext';
import { View, StyleSheet, TextInput, SafeAreaView } from 'react-native';

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

  const goToLocation = () => {
    navigation.navigate("AgregarLocationUser")
  }

  const goToPayment = () => {
    navigation.navigate("AgregarPaymentMethodUser")
  }

  return (
    <ScrollView>
      <View style={styles.mainContainer} >
        <View style={styles.container}>
          <Heading style={styles.title}>Perfil</Heading>
          <Card style={styles.cardContainer}>
            {user.id && ( // Verificación para asegurarse de que user.id esté definido
              <>
                <Image source={{ uri: user.photo }} style={styles.cardImage} alt="Foto de perfil" />
                <Text style={styles.text} >Nombre: {user.nombre}</Text>
                <Text style={styles.text}>Email: {user.email}</Text>
                <Text style={styles.text}>Número de teléfono: {user.phone_number}</Text>

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
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#f1f1f1',
    flex: 1,
  },
  container: {

    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',

  },
  title: {
    paddingTop: 50,
    color: '#344340',
    fontWeight: 'bold',
    fontSize: 50,
    lineHeight: 80,
  },

  text: {
    paddingBottom: 5,
    alignContent: 'space-between',
    fontSize: 15,
    textAlign: 'center'
  },

  textTitles: {
    color: '#FF8300',
    paddingTop: 20,
    textAlign: 'center',
    fontSize: 20
  },

  button: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    backgroundColor: '#FF8300',
    fontSize: 20,
    margin: 20,

  },
  cardContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    width: '90%', // Ajusta el ancho según sea necesario
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center', // Alinea el texto al centro
  },
  cardImage: {
    width: 300,
    height: 300,
    marginBottom: 8,
    borderRadius: 8, // Ajusta según sea necesario
  },
  cardButton: {
    backgroundColor: '#FF8300',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  }
});

export default Profile;
