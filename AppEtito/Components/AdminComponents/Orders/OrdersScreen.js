import React, { useState, useEffect } from 'react';
import { Container, Text, Box, Button, ScrollView, Heading } from 'native-base';
import axios from 'axios';
import { View, StyleSheet } from 'react-native';

const OrdersScreen = () => {
    const [data, setData] = useState([]);
    const [locations, setLocations] = useState({});
    const [paymentMethods, setPaymentMethods] = useState({});
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true); // Nuevo estado para manejar la carga

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await axios.get('http://192.168.1.73:8000/api/orders/');
                setData(response.data);

                // Obtener detalles de claves foráneas
                const locationIds = response.data.map((item) => item.location);
                const paymentMethodIds = response.data.map((item) => item.paymentMethod);
                const user_ids = response.data.map((item) => item.user);

                // Obtener detalles de locations
                const locationResponses = await Promise.all(
                    locationIds.map((locationId) =>
                        axios.get(`http://192.168.1.73:8000/api/locations/${locationId}/`)
                    )
                );
                const locationsData = locationResponses.reduce((acc, response) => {
                    acc[response.data.id] = response.data;
                    return acc;
                }, {});
                setLocations(locationsData);

                // Obtener detalles de payment methods
                const paymentMethodResponses = await Promise.all(
                    paymentMethodIds.map((paymentMethodId) =>
                        axios.get(`http://192.168.1.73:8000/api/payment/${paymentMethodId}/`)
                    )
                );
                const paymentMethodsData = paymentMethodResponses.reduce((acc, response) => {
                    acc[response.data.id] = response.data;
                    return acc;
                }, {});
                setPaymentMethods(paymentMethodsData);

                // Obtener detalles de users
                const userResponses = await Promise.all(
                    user_ids.map((user_id) =>
                        axios.get(`http://192.168.1.73:8000/api/user/${user_id}/`)
                    )
                );
                const usersData = userResponses.reduce((acc, response) => {
                    acc[response.data.id] = response.data;
                    return acc;
                }, {});
                setUsers(usersData);

                // Establecer que la carga ha terminado
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                // Manejar errores aquí si es necesario
                setLoading(false);
            }
        };

        getOrders();
    }, []);

    const handleDeleteAdmin = async (id) => {
        try {
            await axios.delete(`http://192.168.1.73:8000/api/orders/${id}/`);
            setData((prevData) => prevData.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error deleting order:', error.message);
        }
    };

    if (loading) {
        // Mientras se carga, podrías mostrar un indicador de carga
        return (
            <View style={styles.loadingContainer}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <Heading style={styles.title}>ORDENES DE VENTA</Heading>
                    {data.map((item) => (
                        <Box key={item.id} style={styles.cardContainer}>
                            <Text style={styles.cardTitle}>Orden {item.id}</Text>
                            <Text style={styles.cardTitle}>Total: {item.total}</Text>
                            <Text style={styles.cardTitle}>
                                Direccion: {`${locations[item.location]?.address}` ?? 'N/A'}
                            </Text>
                            <Text style={styles.cardTitle}>
                                Tarjeta: {`${paymentMethods[item.paymentMethod]?.cardNumber}` ?? 'N/A'}
                            </Text>
                            <Text style={styles.cardTitle}>
                                Usuario: {`${users[item.user]?.nombre}` ?? 'N/A'}
                            </Text>
                            <Button onPress={() => handleDeleteAdmin(item.id)} style={styles.cardButton}>
                                <Text style={styles.buttonText}>Eliminar</Text>
                            </Button>
                        </Box>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#f1f1f1',
        flex: 1,
    },
    container: {
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        paddingTop: 50,
        color: '#344340',
        fontWeight: 'bold',
        fontSize: 30,
        lineHeight: 80,
    },
    cardContainer: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#ffffff',
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    cardButton: {
        backgroundColor: '#FF8300',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 8,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export default OrdersScreen;
