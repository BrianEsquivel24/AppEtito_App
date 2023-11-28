import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Input, Button, Select, DateTimePicker, Container, Heading } from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, TextInput, SafeAreaView } from 'react-native';

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
            const response = await axios.get('http://192.168.0.9:8000/api/user/');
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
                `http://192.168.1.94:8000/api/payment/${paymentMethod.id}/`,
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
        <ScrollView contentContainerStyle={styles.container}>
          
                <Heading style={styles.title}>Tarjeta</Heading>
                <Container style={styles.formContainer}>
                <Text style={styles.label}>Numero de la tarjeta:</Text>
                <Input
                    value={cardNumber}
                    onChangeText={(text) => setCardNumber(text)}
                    placeholder="Ingrese el número de la tarjeta"
                    style={styles.input}
                />

                <Text style={styles.label}>Fecha de expiracion:</Text>
                <Input
                    value={expiredDate}
                    onChangeText={(text) => setExpiredDate(text)}
                    placeholder="Ingrese la fecha asi yyyy/mm/dd"
                    style={styles.input}
                />

                <Text style={styles.label}>Código de seguridad:</Text>
                <Input
                    value={securityCode}
                    onChangeText={(text) => setSecurityCode(text)}
                    placeholder="Ingrese el código de seguridad"
                    style={styles.input}
                />

                <Text style={styles.label}>Usuario:</Text>
                <Select
                    selectedValue={userId}
                    minWidth="200"
                    accessibilityLabel="Selecciona un usuario"
                    placeholder="Selecciona un usuario"
                    style={styles.input}
                    onValueChange={(text) => setUserId(text)}
                >
                    {users.map((user) => (
                        <Select.Item key={user.id} label={`${user.id} - ${user.nombre}`} value={user.id} />
                    ))}
                </Select>
                </Container>
                <Button onPress={handleUpdate} full style={styles.button}>
                    <Text style={styles.buttonText}>Actualizar Tarjeta</Text>
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

export default UpdatePaymentMethod;
