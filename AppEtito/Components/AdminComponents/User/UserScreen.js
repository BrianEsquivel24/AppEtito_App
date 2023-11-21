import React, { useState, useEffect } from 'react';
import { Container, Content, Text, Button, Box, Image, Center, ScrollView, Heading } from 'native-base';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TextInput, SafeAreaView } from 'react-native';


const UserScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('http://192.168.1.94:8000/api/user/', {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json', 

          },
        });
        setData(response.data);
      } catch (error) {
        if (error.isAxiosError && !error.response) {
          console.error('Network Error:', error.message);
        } else {

          console.error('Error:', error);
        }
      }
    };

    getUsers();
  }, []);

  const agregarUser = () => {
    navigation.navigate('AgregarUser');
  };

  const editarUser = (item) => {
    navigation.navigate('UpdateUser', { user: item });
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://192.168.1.94:8000/api/user/${id}/`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  return (
    <ScrollView>
       <View style={styles.mainContainer}>
        <View style={styles.container}>
      
        <Heading style={styles.title}>USER</Heading>
     
          <Button
           style={styles.button}
            onPress={agregarUser} full>
            <Text style={styles.buttonText}>Agregar User</Text>
          </Button>

          {data.map((item) => (
            <Box key={item.id} style={styles.cardContainer}>
              <Text style={styles.cardTitle}>{item.nombre}</Text>
              <Image source={{ uri: item.photo }} alt="Product Image" style={styles.cardImage} resizeMode="contain" />
              <Button onPress={() => editarUser(item)} style={styles.cardButton}>
                <Text style={styles.buttonText}>Editar</Text>
              </Button>
              <Button onPress={() => handleDeleteUser(item.id)} style={styles.cardButton}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </Button>
            </Box>
          ))}
     
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
    fontSize: 30,
    lineHeight: 80,
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
    width: '100%',
    height: 400,
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

export default UserScreen;
