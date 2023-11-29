import React, { useState, useEffect } from 'react';
import { View, Text, Button, Input, ScrollView, Select, Container, Heading } from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';
import { Alert } from 'react-native';

const AgregarPaymentMethodUser = ({ navigation }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiredDate, setExpiredDate] = useState('');
    const [securityCode, setSecurityCode] = useState('');


    const handleAdd = async () => {
        try {

            if (!cardNumber || !expiredDate || !securityCode) {
                Alert.alert('Por favor, ingrese todos los campos');
                return;
            }
            const id_user = await AsyncStorage.getItem('id')
            const formData = new FormData();
            formData.append('cardNumber', cardNumber);
            formData.append('expiredDate', expiredDate);
            formData.append('securityCode', securityCode);
            formData.append('user', id_user);

            // Omitir 'user' en FormData ya que se manejará de manera diferente

            const response = await axios.post('http://192.168.1.94:8000/api/payment/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Card agregado exitosamente:', response.data);
            navigation.navigate('Profile');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error('Error de validación:', error.response.data);
            } else {
                console.error('Error al agregar el Card:', error);
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Heading style={styles.title}>Nueva Tarjeta</Heading>
            <View style={styles.formContainer}>

                <Text>Numero de la tarjeta:</Text>
                <Input
                    value={cardNumber}
                    onChangeText={(text) => setCardNumber(text)}
                    placeholder="Ingrese la dirección"
                    style={styles.input}
                />

                <Text>Fecha de expiracion:</Text>
                <Input
                    value={expiredDate}
                    onChangeText={(text) => setExpiredDate(text)}
                    placeholder="Ingrese la fecha asi yyyy-mm-dd"
                    style={styles.input}
                />

                <Text>Codigo de seguridad:</Text>
                <Input
                    value={securityCode}
                    onChangeText={(text) => setSecurityCode(text)}
                    placeholder="Ingrese la descripción"
                    style={styles.input}
                />


                {/* Botón para agregar el método de pago */}
                <Button style={styles.button} onPress={handleAdd} full title="Agregar Método de Pago">
                    <Text style={styles.buttonText}>Agregar Tarjeta</Text>
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

    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    }
});

export default AgregarPaymentMethodUser;
