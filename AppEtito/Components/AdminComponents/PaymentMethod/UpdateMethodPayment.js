import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Input, Button, Select, DateTimePicker } from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const UpdatePaymentMethod = ({ route, navigation }) => {
    const { paymentMethod } = route.params;
    const [cardNumber, setCardNumber] = useState(paymentMethod.cardNumber);
    const [expiredDate, setExpiredDate] = useState(new Date(paymentMethod.expiredDate));
    const [securityCode, setSecurityCode] = useState(paymentMethod.securityCode);
    const [userId, setUserId] = useState(paymentMethod.user);
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

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('cardNumber', cardNumber);
            formData.append('expiredDate', expiredDate);
            formData.append('securityCode', securityCode);

            formData.append('user', userId);

            const response = await axios.put(
                `http://192.168.1.73:8000/api/payment/${paymentMethod.id}/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Payment Method actualizado exitosamente:', response.data);
            navigation.navigate('PaymentMethodScreen');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error('Error de validación:', error.response.data);
            } else {
                console.error('Error al actualizar el Payment Method:', error);
            }
        }
    };

    return (
        <ScrollView>
            <Text>Card Number:</Text>
            <Input
                value={cardNumber}
                onChangeText={(text) => setCardNumber(text)}
                placeholder="Ingrese el número de la tarjeta"
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
                placeholder="Ingrese el código de seguridad"
            />

            <Text>Users:</Text>
            <Select
                selectedValue={userId}
                minWidth="200"
                accessibilityLabel="Selecciona un usuario"
                placeholder="Selecciona un usuario"
                onValueChange={(text) => setUserId(text)}
            >
                {users.map((user) => (
                    <Select.Item key={user.id} label={`${user.id} - ${user.nombre}`} value={user.id} />
                ))}
            </Select>

            <Button onPress={handleUpdate} full title="Actualizar Payment Method">
                <Text>Actualizar Payment Method</Text>
            </Button>
        </ScrollView>
    );
};

export default UpdatePaymentMethod;
