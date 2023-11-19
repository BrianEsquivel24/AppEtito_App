import React, { useState, useEffect } from "react";
import { Container, VStack, Box, Heading, Image, Text, Spinner, ScrollView, Button } from "native-base";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const Search = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://192.168.0.9:8000/api/categories/");
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
      <Container alignItems="center">
        <VStack space={4} alignItems="center" mt={4}>
          <Heading fontSize="xl" fontWeight="bold">Lista de Categorías</Heading>

          {loading ? (
            <Spinner />
          ) : (
            <VStack space={4} alignItems="center" mt={2}>
              {categories.map((category) => (
                <Box
                  key={category.id}
                  bg="white"
                  shadow={2}
                  rounded="lg"
                  width="90%"
                  overflow="hidden"
                >
                  <Image
                    source={{ uri: category.image }}
                    alt="Product Image"
                    size={200}
                    resizeMode="contain"
                  />
                  <VStack p={4}>
                    <Heading size="md">{category.name}</Heading>
                    <Text>{category.description}</Text>
                  </VStack>
                  <Button onPress={() => handleVerRestaurantes(category.id)}>Ver Restaurantes</Button>
                </Box>
              ))}
            </VStack>
          )}
        </VStack>
      </Container>
    </ScrollView>
  );
};

export default Search;
