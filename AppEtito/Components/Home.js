import React, { useState, useEffect } from 'react';
import {
  NativeBaseProvider, Container, Text, Box, HStack, VStack,
  Button, ScrollView, Center, Image, Heading
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TextInput, SafeAreaView } from 'react-native';



const CategoryList = ({ categories }) => {
  return (
    <Center>
      {categories.map((item) => (
        <Box style={styles.cardContainer} key={item.id} p={4} borderWidth={1} my={2} borderRadius={8}>
          <Text style={styles.cardTitle} alignContent="center">{item.name}</Text>
          <Image style={styles.cardImage} source={{ uri: item.image }} alt="Product Image" size={200} resizeMode="contain" />
          <Text></Text>
        </Box>
      ))}
    </Center>
  );
};

const RestaurantList = ({ restaurants }) => {
  return (
    <Center>
      {restaurants.map((item) => (
        <Box style={styles.cardContainer} key={item.id} p={4} borderWidth={1} my={2} borderRadius={8}>
          <Text style={styles.cardTitle} alignContent="center">{item.name}</Text>
          <Image style={styles.cardImage} source={{ uri: item.image }} alt="Product Image" size={200} resizeMode="contain" />
          <Text></Text>
        </Box>
      ))}
    </Center>
  );
};

const Home = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const response = await axios.get('http://192.168.1.73:8000/api/restaurants/', {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
        });
        setRestaurantData(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    getRestaurants();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get('http://192.168.1.73:8000/api/categories/', {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
        });
        setCategoryData(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategories();

  }, []);

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Heading style={styles.title}>APPETITO</Heading>
          <View >
            <Text style= {styles.text}>
              ¡Bienvenido a Nuestra Aplicación de Entrega de Comida!
            </Text>


            <Text></Text>

            <Text style= {styles.textTitles}>
              Algunos de nuestros restaurantes
            </Text>
            <RestaurantList
              restaurants={restaurantData.slice(0, 5)}
            />

            <Text style= {styles.textTitles}>
              Algunas de nuestras categorías de comida
            </Text>
            <CategoryList
              categories={categoryData.slice(0, 3)}
            />
          </View>
        </View>

        <Box bg="gray.100" p={4} borderTopWidth={1} borderTopColor="gray.300" alignItems="center">
          <Text fontSize="sm" textAlign="center" color="gray.600">
            Al usar esta aplicación, aceptas nuestros{' '}
            <Button variant="link" colorScheme="teal" onPress={() => alert('Ir a Términos y Condiciones')}>
              Términos y Condiciones
            </Button>
          </Text>
        </Box>
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
    paddingTop: 20,
    alignContent: 'space-between',
    fontSize: 30,
    textAlign: 'justify'
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
    width: '100%',
    height: 200,
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


export default Home;