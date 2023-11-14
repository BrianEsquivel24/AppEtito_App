import React, { useState, useEffect } from 'react';
import { View, Text, Button, Input, ScrollView, Select, Container, Heading } from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const AgregarPaymentMethod = ({ navigation }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiredDate, setExpiredDate] = useState('');
    const [securityCode, setSecurityCode] = useState('');
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
            console.error('Error al obtener usuarios:', error);
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
            formData.append('cardNumber', cardNumber);
            formData.append('expiredDate', expiredDate);
            formData.append('securityCode', securityCode);
            formData.append('user', userId);

            const response = await axios.post(
                'http://192.168.1.73:8000/api/payment/',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Card agregado exitosamente:', response.data);
            navigation.navigate('PaymentMethodScreen');
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
                    placeholder="Ingrese la fecha asi yyyy/mm/dd"
                />

                <Text>Security Code:</Text>
                <Input
                    value={securityCode}
                    onChangeText={(text) => setSecurityCode(text)}
                    placeholder="Ingrese la descripción"
                />

                <Text>User:</Text>
                <Select
                    selectedValue={userId}
                    minWidth="200"
                    accessibilityLabel="Selecciona una categoría"
                    placeholder="Selecciona una categoría"
                    onValueChange={(text) => setUserId(text)}
                >
                    {users.map((user) => (
                        <Select.Item key={user.id} label={`${user.id} - ${user.nombre}`} value={user.id} />
                    ))}
                </Select>

                <Button onPress={handleAdd} full title="Agregar Administrador">
                    <Text>Agregar Card</Text>
                </Button>
            </Container>
        </ScrollView>
    );
};

export default AgregarPaymentMethod;
