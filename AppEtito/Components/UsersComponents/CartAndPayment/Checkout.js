import React, { useState, useEffect } from 'react';
import { View, Text, Button, Input, ScrollView, Select, Container, Heading } from 'native-base';
import axios from 'axios';
import { StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { useCart } from '../CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkout = ({ navigation }) => {
    const [locationId, setLocationId] = useState('');
    const [paymentMethodID, setPaymentMethodId] = useState('');
    const [cards, setCards] = useState([]);
    const [addresses, setAddresses] = useState([]);

    const { total, clearCart } = useCart();


    useEffect(() => {

        fetchUserCards();
        fetchLocationUser();

        console.log(cards)
        console.log(addresses)
    }, []);


    // Obtener tarjetas del usuario al cargar el componente
    const fetchUserCards = async () => {
        const idUser = await AsyncStorage.getItem('id')
        try {
            const response = await axios.get(`http://192.168.1.73:8000/api/payment/${idUser}/print_card_per_user/`);
            console.log(response.data)
            setCards(response.data.cards);
        } catch (error) {
            console.error('Error al obtener cards:', error);
        }
    };

    const fetchLocationUser = async () => {
        const idUser = await AsyncStorage.getItem('id')
        console.log(idUser)
        try {
            const response = await axios.get(`http://192.168.1.73:8000/api/locations/${idUser}/print_locations_per_user/`);
            console.log(response.data)
            setAddresses(response.data.locations);
        } catch (error) {
            console.error('Error al obtener locations:', error);
        }
    };

    const handleAdd = async () => {
        const idUser = await AsyncStorage.getItem('id')
        try {
            const formData = new FormData();
            formData.append('total', total);
            formData.append('location', locationId);
            formData.append('paymentMethod', paymentMethodID);
            formData.append('user', idUser);

            const response = await axios.post(
                'http://192.168.1.73:8000/api/orders/',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Order agregado exitosamente:', response.data);
            clearCart();
            navigation.navigate('Cart');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error('Error de validación:', error.response.data);
            } else {
                console.error('Error al agregar la order:', error);
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Heading style={styles.title}> PAGAR</Heading>
            <Container  >
                <Text style={styles.label}>Total: {total}</Text>
                <Text>Dirección:</Text>
                <Select
                    selectedValue={locationId}
                    minWidth="200"
                    accessibilityLabel="Selecciona una categoría"
                    placeholder="Selecciona una categoría"
                    onValueChange={(text) => setLocationId(text)}
                >
                    {addresses.map((addresses) => (
                        <Select.Item key={addresses.id} label={`${addresses.id} - ${addresses.address}`} value={addresses.id} />
                    ))}
                </Select>

                <Text>Tarjeta:</Text>
                <Select
                    selectedValue={paymentMethodID}
                    minWidth="200"
                    accessibilityLabel="Selecciona una categoría"
                    placeholder="Selecciona una categoría"
                    onValueChange={(text) => setPaymentMethodId(text)}
                >
                    {Array.isArray(cards) && cards.map((card) => (
                        <Select.Item key={card.id} label={`${card.id} - ${card.cardNumber}`} value={card.id} />
                    ))}
                </Select>
            </Container>

            <Button onPress={handleAdd} full title="Agregar Administrador" style={styles.button}>
                <Text style={styles.buttonText}>PAGAR</Text>
            </Button>

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
        borderColor: '#ccc', // Color del borde
        borderWidth: 1,

        paddingHorizontal: 8, // Ajusta el espacio horizontal dentro del input
        paddingVertical: 6,   // Ajusta el espacio vertical dentro del input
        backgroundColor: '#fff', // Color de fondo del input

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


export default Checkout;