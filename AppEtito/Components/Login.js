import React, { useState } from 'react';
import { Container, Content, Form, Input, Button, Text, Center, FormControl } from 'native-base';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Peticion al back
    axios.post('http://192.168.1.73:8000/api/login/', {
      nombre: username,
      password: password,
    })
      .then(function (response) {
        // Aquí checa si es admin o user
        console.log(response.data.role);
        const userRole = response.data.role;
        if (userRole === 'admin') {
          // Navega a la pantalla de administrador
          navigation.navigate('AdminView');
        } else if (userRole === 'user') {
          // Navega a la pantalla de usuario regular
          navigation.navigate('UserHome');
        } else {
          // Falta poner un modal o algo que aparezca si no encuentra el usuario
          // ni en admin ni en user
          console.log("Usuario no encontrado");
        }
      })
      .catch(function (error) {
        // Los errores
        console.log(error);
      });
  };

  return (
    <Container>
      <Center>
        <FormControl>
          <Text>Login</Text>
          <Input
            placeholder="Nombre de usuario"
            onChangeText={(text) => setUsername(text)}
          />
          <Input
            placeholder="Contraseña"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <Button onPress={handleLogin}>
            <Text>Iniciar sesión</Text>
          </Button>
        </FormControl>
      </Center>
    </Container>
  );
};

export default Login;
