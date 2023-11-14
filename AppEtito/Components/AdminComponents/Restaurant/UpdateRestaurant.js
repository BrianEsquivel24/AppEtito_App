import React, { useState, useEffect } from 'react';
import { View, Text, Button, Input, ScrollView, Image, Select } from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const UpdateRestaurant = ({ route, navigation }) => {
    const { restaurant } = route.params;
    const [name, setName] = useState(restaurant.name);
    const [description, setDescription] = useState(restaurant.description);
    const [location, setLocation] = useState(restaurant.Location);
    const [branches, setBranches] = useState(restaurant.branches);
    const [categoryId, setCategoryId] = useState(restaurant.categories);
    const [image, setImage] = useState(restaurant.image);
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

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://192.168.1.73:8000/api/categories/');
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

    

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('location', location);
            formData.append('branches', branches);
            formData.append('categories', categoryId);

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
                `http://192.168.1.73:8000/api/restaurants/${restaurant.id}/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Restaurante actualizado exitosamente:', response.data);
            navigation.navigate('RestaurantScreen');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error('Error de validación:', error.response.data);
            } else {
                console.error('Error al actualizar el restaurante:', error);
            }
        }
    };

    return (
        <ScrollView>
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


            <Text>Location:</Text>
            <Input
                value={location}
                onChangeText={(text) => setLocation(text)}
                placeholder="Ingrese la localización"
            />

            <Text>Branches:</Text>
            <Input
                value={branches}
                onChangeText={(text) => setBranches(text)}
                placeholder="Ingrese la cantidad de branches"

            />

            <Text>Categoría:</Text>
            <Select
                selectedValue={categoryId}
                minWidth="200"
                accessibilityLabel="Selecciona una categoría"
                placeholder="Selecciona una categoría"
                onValueChange={(text) => setCategoryId(text)}  // Corregir aquí
            >
                {categories.map((category) => (
                    <Select.Item key={category.id} label={`${category.id} - ${category.name}`} value={category.id} />
                ))}
            </Select>


            <Button onPress={handlePickDocument} full title="Seleccionar Archivo">
                <Text>Seleccionar Archivo</Text>
            </Button>

            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} alt="Foto seleccionada" />}

            <Button onPress={handleUpdate} full title="Actualizar Administrador">
                <Text>Actualizar Administrador</Text>
            </Button>
        </ScrollView>
    );
};

export default UpdateRestaurant;
