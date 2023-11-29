import React, { useState, useEffect } from "react";
import { Container, VStack, Box, Heading, Image, Text, Spinner, ScrollView, Button } from "native-base";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TextInput, SafeAreaView } from 'react-native';

const Search = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://192.168.1.73:8000/api/categories/");
        setCategories(response.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleVerRestaurantes = (categoryId) => {
    setSelectedCategory(categoryId);
    navigation.navigate('RestaurantList', { categoryId });

  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Heading style={styles.title}>Categorías</Heading>

          {loading ? (
            <Spinner />
          ) : (
            <VStack space={4} alignItems="center" mt={2}>
              {categories.map((category) => (
                <Box
                  style={styles.cardContainer}
                  key={category.id}
                  bg="white"
                  shadow={2}
                  rounded="lg"
                  width="90%"
                  overflow="hidden"
                >
                  <Image
                    style={styles.cardImage}
                    source={{ uri: category.image }}
                    alt="Product Image"
                    resizeMode="contain"
                  />
                  <View >
                    <Text style={styles.cardTitle}>{category.name}</Text>
                    <Text style={styles.text}>{category.description}</Text>
                  </View>
                  <Button style={styles.cardButton} onPress={() => handleVerRestaurantes(category.id)}>Restaurantes</Button>
                </Box>
              ))}
            </VStack>
          )}
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


export default Search;
