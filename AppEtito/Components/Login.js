import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    //peticion al back
    axios.post('http://127.0.0.1:8000/api/login/', {
      nombre: username,
      password: password,
      
    })
      .then(function (response) {
        //aqui checa si es admin o user
        console.log(response.data.role)
        const userRole = response.data.role;
        if (userRole === 'admin') {
          // Navega a la pantalla de administrador
          navigation.navigate('AdminCrud');
        } else if (userRole === 'user') {
          // Navega a la pantalla de usuario regular
          navigation.navigate('UserHome');
        } else {
          //falta poner un modal o algo que aparezca si no encuentra el usuario
          //ni en admin ni en user
          console.log("Usuario no encontrado")
        }
      })
      .catch(function (error) {
        //los errores
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
