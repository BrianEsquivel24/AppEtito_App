import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Realiza la solicitud Axios al backend Django
    axios.post('http://0.0.0.0:8000/login/', {
      username: username,
      password: password,
    })
      .then(function (response) {
        // Maneja la respuesta del servidor aquí
        console.log(response.data.role)
        const userRole = response.data.role;
        if (userRole === 'admin') {
          // Navega a la pantalla de administrador
          navigation.navigate('AdminHome');
        } else if (userRole === 'user') {
          // Navega a la pantalla de usuario regular
          navigation.navigate('UserHome');
        } else {
          // Usuario no encontrado, maneja el caso según tus necesidades
        }
      })
      .catch(function (error) {
        // Maneja errores aquí
        console.log(error);
      });
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput
        placeholder="Nombre de usuario"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
}

export default Login
