import React, { useState, useEffect } from 'react';
import { View, Text, Button, Input, ScrollView, Select, Container, Heading } from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
AsyncStorage

const AgregarPaymentMethodUser = ({ navigation }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiredDate, setExpiredDate] = useState('');
    const [securityCode, setSecurityCode] = useState('');


    const handleAdd = async () => {
        try {
            const id_user = await AsyncStorage.getItem('id')
            const formData = new FormData();
            formData.append('cardNumber', cardNumber);
            formData.append('expiredDate', expiredDate);
            formData.append('securityCode', securityCode);
            formData.append('user', id_user);

            // Omitir 'user' en FormData ya que se manejará de manera diferente

            const response = await axios.post('http://192.168.1.73:8000/api/payment/', formData, {
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
        <ScrollView>
            <Container style={{ paddingTop: 40 }} alignItems="center">
                <Heading>Create Method Payment</Heading>
                <Text>Card Number:</Text>
                <Input
                    value={cardNumber}
                    onChangeText={(text) => setCardNumber(text)}
                    placeholder="Ingrese la dirección"
                />

                <Text>Expired Date:</Text>
                <Input
                    value={expiredDate}
                    onChangeText={(text) => setExpiredDate(text)}
                    placeholder="Ingrese la fecha asi yyyy-mm-dd"
                />

                <Text>Security Code:</Text>
                <Input
                    value={securityCode}
                    onChangeText={(text) => setSecurityCode(text)}
                    placeholder="Ingrese la descripción"
                />

                
                {/* Botón para agregar el método de pago */}
                <Button onPress={handleAdd} full title="Agregar Método de Pago">
                    <Text>Agregar Método de Pago</Text>
                </Button>
            </Container>
        </ScrollView>
    );
};

export default AgregarPaymentMethodUser;
