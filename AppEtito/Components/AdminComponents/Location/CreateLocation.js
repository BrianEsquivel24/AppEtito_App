import React, { useState, useEffect } from 'react';
import { View, Text, Button, Input, ScrollView, Image, Select, CheckIcon, Center, Container, Heading } from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, TextInput, SafeAreaView } from 'react-native';

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
            const response = await axios.get('http://192.168.1.94:8000/api/user/');
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
                'http://192.168.1.94:8000/api/locations/',
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
        <ScrollView contentContainerStyle={styles.container}>
           
                <Heading style={styles.title}>Dirección</Heading>
                <Container  >
                <Text style={styles.label}>Direccion:</Text>
                <Input
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                    placeholder="Ingrese la direccion"
                    style={styles.input}
                />

                <Text style={styles.label}>Numero exterior:</Text>
                <Input
                    value={addressNumber}
                    onChangeText={(text) => setAddressNumber(text)}
                    placeholder="Ingrese el numero exterior"
                    style={styles.input}
                />

                <Text style={styles.label}>Descripcion:</Text>
                <Input
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    placeholder="Ingrese la description"
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
                    {users.map((users) => (
                        <Select.Item key={users.id} label={`${users.id} - ${users.nombre}`} value={users.id} />
                    ))}
                </Select>

                </Container>
                <Button onPress={handleAdd} full title="Agregar Administrador" style={styles.button}>
                    <Text style={styles.buttonText}>Agregar Direccion</Text>
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
  

export default AgregarLocation;
