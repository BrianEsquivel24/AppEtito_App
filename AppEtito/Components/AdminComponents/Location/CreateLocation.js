import React, { useState, useEffect } from 'react';
import { View, Text, Button, Input, ScrollView, Image, Select, CheckIcon, Center } from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const AgregarLocation = ({ navigation }) => {
    const [address, setAddress] = useState('');
    const [addressNumber, setAddressNumber] = useState('');
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Solicitar permisos al cargar el componente
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                console.error('Se necesitan permisos para acceder a la biblioteca de medios.');
            }
        })();



        fetchUsers();
    }, []);


    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://192.168.1.73:8000/api/user/');
            setUsers(response.data);
        } catch (error) {
            console.error('Error al obtener user:', error);
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
            formData.append('address', address);
            formData.append('addressNumber', addressNumber);
            formData.append('description', description);

            formData.append('user', userId);

            const response = await axios.post(
                'http://192.168.1.73:8000/api/locations/',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Location agregado exitosamente:', response.data);
            navigation.navigate('LocationScreen');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error('Error de validación:', error.response.data);
            } else {
                console.error('Error al agregar el Location:', error);
            }
        }
    };

    return (
        <ScrollView>
            <Text>Address:</Text>
            <Input
                value={address}
                onChangeText={(text) => setAddress(text)}
                placeholder="Ingrese la direccion"
            />

            <Text>Address Number:</Text>
            <Input
                value={addressNumber}
                onChangeText={(text) => setAddressNumber(text)}
                placeholder="Ingrese la location"
            />

            <Text>Description:</Text>
            <Input
                value={description}
                onChangeText={(text) => setDescription(text)}
                placeholder="Ingrese la description"
            />

            <Text>User:</Text>
            <Select
                selectedValue={userId}
                minWidth="200"
                accessibilityLabel="Selecciona una categoría"
                placeholder="Selecciona una categoría"
                onValueChange={(text) => setUserId(text)}
            >
                {users.map((users) => (
                    <Select.Item key={users.id} label={`${users.id} - ${users.nombre}`} value={users.id} />
                ))}
            </Select>


            <Button onPress={handleAdd} full title="Agregar Administrador">
                <Text>Agregar Location</Text>
            </Button>
        </ScrollView>
    );
};

export default AgregarLocation;
