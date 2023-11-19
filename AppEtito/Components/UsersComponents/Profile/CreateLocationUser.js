import React, { useState, useEffect } from 'react';
import { View, Text, Button, Input, ScrollView, Image, Heading } from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AgregarLocationUser = ({ navigation }) => {
    const [address, setAddress] = useState('');
    const [addressNumber, setAddressNumber] = useState('');
    const [description, setDescription] = useState('');


    const handleAdd = async () => {
        try {
            const id_user = await AsyncStorage.getItem('id')
            const formData = new FormData();
            formData.append('address', address);
            formData.append('addressNumber', addressNumber);
            formData.append('description', description);
            formData.append('user', id_user);

            // Omitir 'user' en FormData ya que se manejará de manera diferente

            const response = await axios.post('http://192.168.1.73:8000/api/locations/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Location agregado exitosamente:', response.data);
            navigation.navigate('Profile');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error('Error de validación:', error.response.data);
            } else {
                console.error('Error al agregar el Location:', error);
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Heading style={styles.title}>New Location</Heading>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Address:</Text>
                <Input
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                    placeholder="Ingrese la direccion"
                    style={styles.input}
                />

                <Text style={styles.label}>Address Number:</Text>
                <Input
                    value={addressNumber}
                    onChangeText={(text) => setAddressNumber(text)}
                    placeholder="Ingrese la location"
                />

                <Text style={styles.label}>Description:</Text>
                <Input
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    placeholder="Ingrese la description"
                />

                {/* Botón para agregar la ubicación */}
                <Button onPress={handleAdd} full title="Agregar Location">
                    <Text>Agregar Location</Text>
                </Button>
            </View>
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
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: '#fff',
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
});

export default AgregarLocationUser;
