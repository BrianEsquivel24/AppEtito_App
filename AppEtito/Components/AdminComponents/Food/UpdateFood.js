import React, { useState, useEffect } from 'react';
import { View, Text, Button, Input, ScrollView, Image, Select, Container, Heading } from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const UpdateFood = ({ route, navigation }) => {
    const { foods } = route.params;
    const [name, setName] = useState(foods.name);
    const [description, setDescription] = useState(foods.description);
    const [price, setPrice] = useState(parseFloat(foods.price));
    const [restaurantId, setRestaurantId] = useState(foods.restaurant);
    const [image, setImage] = useState(foods.image);
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

    const fetchRestaurants = async () => {
        try {
            const response = await axios.get('http://192.168.0.9:8000/api/restaurants/');
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



    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('restaurant', restaurantId);

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
                `http://192.168.0.9:8000/api/foods/${foods.id}/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Food actualizado exitosamente:', response.data);
            navigation.navigate('FoodScreen');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error('Error de validación:', error.response.data);
            } else {
                console.error('Error al actualizar la comida:', error);
            }
        }
    };

    return (
        <ScrollView>
            <Container style={{ paddingTop: 40 }} alignItems="center">
                <Heading>UPDATE FOOD</Heading>
                <Text>Name:</Text>
                <Input
                    value={name}
                    onChangeText={(text) => setName(text)}
                    placeholder="Ingrese el nombre"
                />

                <Text>Description:</Text>
                <Input
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    placeholder="Ingrese la dirección"
                />

                <Text>Price:</Text>
                <Input
                    value={price.toString()}
                    onChangeText={(text) => setPrice(text)}
                    placeholder="Ingrese el precio"
                />

                <Text>Restaurante:</Text>
                <Select
                    selectedValue={restaurantId}
                    minWidth="200"
                    accessibilityLabel="Selecciona un restaurante"
                    placeholder="Selecciona una categoría"
                    onValueChange={(text) => setRestaurantId(text)}  // Corregir aquí
                >
                    {restaurants.map((restaurant) => (
                        <Select.Item key={restaurant.id} label={`${restaurant.id} - ${restaurant.name}`} value={restaurant.id} />
                    ))}
                </Select>


                <Button onPress={handlePickDocument} full title="Seleccionar Archivo">
                    <Text>Seleccionar Archivo</Text>
                </Button>

                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} alt="Foto seleccionada" />}

                <Button onPress={handleUpdate} full title="Actualizar Administrador">
                    <Text>Actualizar Administrador</Text>
                </Button>
            </Container>
        </ScrollView>
    );
};

export default UpdateFood;
