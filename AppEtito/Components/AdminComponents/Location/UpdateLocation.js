import React, { useState, useEffect } from 'react';
import { View, Text, Button, Input, ScrollView, Image, Select, Container, Heading } from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const UpdateLocation = ({ route, navigation }) => {
    const { location } = route.params;
    const [address, setAddress] = useState(location.address);
    const [addressNumber, setAddressNumber] = useState(location.address);
    const [description, setDescription] = useState(location.description);
    const [userId, setUserId] = useState(location.user);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Solicitar permisos al cargar el componente
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                console.error('Se necesitan permisos para acceder a la biblioteca de medios.');
            }
        })();

        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get('http://192.168.0.9:8000/api/user/');
            setUsers(response.data);
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
            formData.append('address', address);
            formData.append('addressNumber', addressNumber);
            formData.append('description', description);

            formData.append('user', userId);



            const response = await axios.put(
                `http://192.168.0.9:8000/api/locations/${location.id}/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Location actualizado exitosamente:', response.data);
            navigation.navigate('LocationScreen');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error('Error de validación:', error.response.data);
            } else {
                console.error('Error al actualizar la location:', error);
            }
        }
    };

    return (
        <ScrollView>
            <Container style={{ paddingTop: 40 }} alignItems="center">
                <Heading>UPDATE LOCATION</Heading>
                <Text>Address:</Text>
                <Input
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                    placeholder="Ingrese la address"
                />

                <Text>Address Number:</Text>
                <Input
                    value={addressNumber}
                    onChangeText={(text) => setAddressNumber(text)}
                    placeholder="Ingrese la address number"
                />

                <Text>Description:</Text>
                <Input
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    placeholder="Ingrese la descripcion"
                />

                <Text>Users:</Text>
                <Select
                    selectedValue={userId}
                    minWidth="200"
                    accessibilityLabel="Selecciona una categoría"
                    placeholder="Selecciona una categoría"
                    onValueChange={(text) => setUserId(text)}  // Corregir aquí
                >
                    {users.map((users) => (
                        <Select.Item key={users.id} label={`${users.id} - ${users.nombre}`} value={users.id} />
                    ))}
                </Select>


                <Button onPress={handleUpdate} full title="Actualizar Administrador">
                    <Text>Actualizar User</Text>
                </Button>
            </Container>
        </ScrollView>
    );
};

export default UpdateLocation;
