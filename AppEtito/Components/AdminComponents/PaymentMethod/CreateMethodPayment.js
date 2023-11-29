import React, { useState, useEffect } from 'react';
import {Text, Button, Input, ScrollView, Select, Container, Heading } from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { View, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { Alert } from 'react-native';

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

            if (!cardNumber || !expiredDate || !expiredDate || !securityCode || !userId) {
                Alert.alert('Por favor, ingrese todos los campos');
                return;
              }
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
        <ScrollView contentContainerStyle={styles.container}>
           
                <Heading style={styles.title}>Tarjeta</Heading>
                <Container>
                <Text style={styles.label}>Numero de la tarjeta:</Text>
                <Input
                    value={cardNumber}
                    onChangeText={(text) => setCardNumber(text)}
                    placeholder="Ingrese el numero"
                    style={styles.input}
                />

                <Text style={styles.label}>Fecha de expiracion:</Text>
                <Input
                    value={expiredDate}
                    onChangeText={(text) => setExpiredDate(text)}
                    placeholder="Ingrese la fecha asi yyyy/mm/dd"
                    style={styles.input}
                />

                <Text style={styles.label}>Codigo de seguridad:</Text>
                <Input
                    value={securityCode}
                    onChangeText={(text) => setSecurityCode(text)}
                    placeholder="Ingrese el codigo de seguridad"
                    style={styles.input}
                />

                <Text style={styles.label}>Usuario:</Text>
                <Select
                    selectedValue={userId}
                    minWidth="200"
                    accessibilityLabel="Selecciona una categoría"
                    placeholder="Selecciona un usuario"
                    style={styles.input}
                    onValueChange={(text) => setUserId(text)}
                >
                    {users.map((user) => (
                        <Select.Item key={user.id} label={`${user.id} - ${user.nombre}`} value={user.id} />
                    ))}
                </Select>
                </Container>
                <Button onPress={handleAdd} full title="Agregar Administrador" style={styles.button}>
                    <Text style={styles.buttonText}>Agregar Tarjeta</Text>
                </Button>
           
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
  
    button: {
      width: '80%',
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25,
      backgroundColor: '#FF8300',
      fontSize: 20,
      margin: 20,
      
    },
     cardContainer: {
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
      backgroundColor: '#ffffff',
      width: '90%', // Ajusta el ancho según sea necesario
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
      textAlign: 'center', // Alinea el texto al centro
    },
    cardImage: {
      width: '100%',
      height: 400,
      marginBottom: 8,
      borderRadius: 8, // Ajusta según sea necesario
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
    }
  });
export default AgregarPaymentMethod;
